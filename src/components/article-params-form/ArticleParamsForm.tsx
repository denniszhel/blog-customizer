import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState, useRef } from 'react';
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
	const [formSubmitted, setFormSubmitted] = useState<number>(0);
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: formOpen,
		rootRef,
		onClose: setFormOpen
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
		  setState((state) => ({ ...state, [field]: value }));
		  setFormSubmitted(0);
		};
	};

	useEffect(() => {
		if (formSubmitted) {
			props.onApply(state);
		}
	}, [formSubmitted]);

	function abortChanges() {
		setState(defaultArticleState);
		setFormSubmitted(1);
	}

	function submitChanges(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		setFormSubmitted(2);
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
							selected={state.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleOnChange('fontFamilyOption')}
							title='Шрифт'
						/>
						<RadioGroup
							name='font-size-group'
							selected={state.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleOnChange('fontSizeOption')}
							title='Размер шрифта'
						/>
						<Select
							selected={state.fontColor}
							options={fontColors}
							onChange={handleOnChange('fontColor')}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={state.backgroundColor}
							options={backgroundColors}
							onChange={handleOnChange('backgroundColor')}
							title='Цвет фона'
						/>
						<Select
							selected={state.contentWidth}
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
