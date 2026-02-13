import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEsc = {
	isSettingSidebarOpen: boolean; // Флаг, открыт ли элемент (например, модальное окно или форма)
	setIsSettingSidebarOpen?: () => void; // Колбэк, вызываемый при закрытии
	sidebarRef: React.RefObject<HTMLElement>; // Ссылка на DOM-элемент, вне которого отслеживаем клик
};

export const useCloseOnOutsideClickOrEsc = ({
	isSettingSidebarOpen,
	sidebarRef,
	setIsSettingSidebarOpen,
}: UseCloseOnOutsideClickOrEsc) => {
	useEffect(() => {
		if (!isSettingSidebarOpen) {
			// Если элемент закрыт, обработчики не нужны
			return;
		}

		const handleClick = ({ target }: MouseEvent) => {
			// Если клик был вне элемента — вызываем onClose
			if (
				event &&
				target instanceof Node &&
				event.target instanceof HTMLElement &&
				!sidebarRef.current?.contains(event.target)
			) {
				setIsSettingSidebarOpen?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			// Закрытие по нажатию Escape
			if (event.key === 'Escape') {
				setIsSettingSidebarOpen?.();
			}
		};

		// Добавляем обработчики
		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		// Убираем обработчики при размонтировании или изменении зависимостей
		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSettingSidebarOpen, sidebarRef, setIsSettingSidebarOpen]);
};
