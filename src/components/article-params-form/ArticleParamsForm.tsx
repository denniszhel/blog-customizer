import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { Select } from '../select';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Text } from 'components/text';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState, OptionType } from '../../constants/articleProps'
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';

export type ArticleStateType = {
	fontFamilyOption: OptionType,
	fontSizeOption: OptionType,
	fontColor: OptionType,
	backgroundColor: OptionType,
	contentWidth: OptionType
};

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [articleParamsFormState, setArticleParamsFormState] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: formOpen,
		rootRef,
		onClose: setFormOpen
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
		  setArticleParamsFormState((state) => ({ ...state, [field]: value }));
		};
	};

	function abortChanges() {
		setArticleParamsFormState(defaultArticleState);
		props.onApply(defaultArticleState);
	}

	function submitChanges(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		props.onApply(articleParamsFormState);
		setFormOpen(false);
	}

	return (
		<div ref={rootRef}>
			<ArrowButton formOpen={formOpen} onclick={setFormOpen}/>
			<aside className={clsx(styles.container, {[styles.container_open]: formOpen})}>
				<form className={styles.form} onSubmit={submitChanges} onReset={abortChanges}>
					<Text size={22} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<div className={styles.mainContainer}>
						<Select
							selected={articleParamsFormState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleOnChange('fontFamilyOption')}
							title='Шрифт'
						/>
						<RadioGroup
							name='font-size-group'
							selected={articleParamsFormState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleOnChange('fontSizeOption')}
							title='Размер шрифта'
						/>
						<Select
							selected={articleParamsFormState.fontColor}
							options={fontColors}
							onChange={handleOnChange('fontColor')}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={articleParamsFormState.backgroundColor}
							options={backgroundColors}
							onChange={handleOnChange('backgroundColor')}
							title='Цвет фона'
						/>
						<Select
							selected={articleParamsFormState.contentWidth}
							options={contentWidthArr}
							onChange={handleOnChange('contentWidth')}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
