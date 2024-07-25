import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, Settings } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { useState } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	let [fontFamilyOption, setFontFamilyOption] = useState(defaultArticleState.fontFamilyOption);
	let [fontSizeOption, setFontSizeOption] = useState(defaultArticleState.fontSizeOption);
	let [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	let [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	let [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

	function updateStyles(settings: Settings) {
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
