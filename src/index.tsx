import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, ArticleStateType } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { useState } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [fontFamilyOption, setFontFamilyOption] = useState(defaultArticleState.fontFamilyOption);
	const [fontSizeOption, setFontSizeOption] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

	function updateStyles(settings: ArticleStateType) {
		setFontFamilyOption(settings.fontFamilyOption);
		setFontSizeOption(settings.fontSizeOption);
		setFontColor(settings.fontColor);
		setBackgroundColor(settings.backgroundColor);
		setContentWidth(settings.contentWidth);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamilyOption.value,
					'--font-size': fontSizeOption.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={updateStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
