import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	appliedState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ appliedState, onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localState, setLocalState] = useState<ArticleStateType>(appliedState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setLocalState(appliedState);
	}, [appliedState]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(target) &&
				!(event.target as HTMLElement).closest('[role="button"][aria-label*="Открыть/Закрыть"]')
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleSidebar = () => setIsOpen(prev => !prev);

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[number]) => {
		setLocalState(prev => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setLocalState(prev => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setLocalState(prev => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: (typeof backgroundColors)[number]) => {
		setLocalState(prev => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[number]) => {
		setLocalState(prev => ({ ...prev, contentWidth: option }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setLocalState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.textSettings}>
						<Text as='h2' size={31} weight={800} uppercase>
							Настройки статьи
						</Text>
						<Select
							title='Шрифт'
							selected={localState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>
						<RadioGroup
							title='Размер текста'
							name='fontSize'
							options={fontSizeOptions}
							selected={localState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
						<Select
							title='Цвет текста'
							selected={localState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={localState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
						/>
					</div>
					<div className={styles.layoutSettings}>
						<Select
							title='Ширина контента'
							selected={localState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
						/>
					</div>
					<div className={styles.actionButtons}>
						<Button
							title='Сброс'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
