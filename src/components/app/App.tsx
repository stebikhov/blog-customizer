import { CSSProperties, useState } from 'react';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				appliedState={appliedState}
				onApply={setAppliedState}
			/>
			<Article />
		</main>
	);
};
