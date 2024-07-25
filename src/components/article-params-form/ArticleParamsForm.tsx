import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import { Select } from '../select';
import { Text } from 'components/text';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState, OptionType } from '../../constants/articleProps'
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export type Settings = {
	fontFamilyOption: OptionType,
	fontSizeOption: OptionType,
	fontColor: OptionType,
	backgroundColor: OptionType,
	contentWidth: OptionType
};

type ArticleParamsFormProps = {
	onApply: (settings: Settings) => void
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	let [asideClassName, setAsideClassName] = useState(styles.container);

	let [fontFamilyOptionSelected, setFontFamilyOptionSelected] = useState(defaultArticleState.fontFamilyOption);
	let [fontSizeOptionSelected, setFontSizeOptionSelected] = useState(defaultArticleState.fontSizeOption);
	let [fontColorSelected, setFontColorSelected] = useState(defaultArticleState.fontColor);
	let [backgroundColorSelected, setBackgroundColorSelected] = useState(defaultArticleState.backgroundColor);
	let [contentWidthSelected, setContentWidthSelected] = useState(defaultArticleState.contentWidth);

	let [countBtnClicks, setCountBtnClicks] = useState(0);

	useEffect(() => {
		const settings = {
			fontFamilyOption: fontFamilyOptionSelected,
			fontSizeOption: fontSizeOptionSelected,
			fontColor: fontColorSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: contentWidthSelected
		};
		props.onApply(settings);
	}, [countBtnClicks]);

	function updateOpen(open: boolean) {
		if (open) {
			setAsideClassName(styles.container + ' ' + styles.container_open);
		} else {
			setAsideClassName(styles.container);
		}
	}

	function abortChanges() {
		setFontFamilyOptionSelected(defaultArticleState.fontFamilyOption);
		setFontSizeOptionSelected(defaultArticleState.fontSizeOption);
		setFontColorSelected(defaultArticleState.fontColor);
		setBackgroundColorSelected(defaultArticleState.backgroundColor);
		setContentWidthSelected(defaultArticleState.contentWidth);
		setCountBtnClicks(countBtnClicks - 1);
	}

	function submitChanges(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		setCountBtnClicks(countBtnClicks + 1);
	}

	return (
		<>
			<ArrowButton onclick={updateOpen}/>
			<aside className={asideClassName}>
				<form className={styles.form} onSubmit={submitChanges} onReset={abortChanges}>
					<Text size={22} weight={800} uppercase align='left' dynamicLite>
						Задайте параметры
					</Text>
					<div className={styles.mainContainer}>
						<Select
							selected={fontFamilyOptionSelected}
							options={fontFamilyOptions}
							onChange={setFontFamilyOptionSelected}
							title='Шрифт'
						/>
						<RadioGroup
							name='font-size-group'
							selected={fontSizeOptionSelected}
							options={fontSizeOptions}
							onChange={setFontSizeOptionSelected}
							title='Размер шрифта'
						/>
						<Select
							selected={fontColorSelected}
							options={fontColors}
							onChange={setFontColorSelected}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={backgroundColorSelected}
							options={backgroundColors}
							onChange={setBackgroundColorSelected}
							title='Цвет фона'
						/>
						<Select
							selected={contentWidthSelected}
							options={contentWidthArr}
							onChange={setContentWidthSelected}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
