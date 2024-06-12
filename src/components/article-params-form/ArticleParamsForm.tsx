import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';
import { useOutsideMousedownClose } from './hooks/useOutsideMousedownClose';

type ArticleParamsFormProps = {
	handleSettingsChange: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	handleSettingsChange,
}: ArticleParamsFormProps) => {
	const [settings, setSettings] = useState(defaultArticleState);

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const ref = useRef<HTMLDivElement | null>(null);

	const toggleForm = () => setIsMenuOpen(!isMenuOpen);

	const closeForm = () => setIsMenuOpen(false);

	useOutsideMousedownClose({
		isMenuOpen,
		onChange: closeForm,
		rootRef: ref,
	});

	const handleSettingChange = (option: OptionType, name: string) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[name]: option,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSettingsChange(settings);
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSettings(defaultArticleState);
		handleSettingsChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isMenuOpen={isMenuOpen} />
			<aside
				className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<div className={styles.field_container}>
						<Text
							as='label'
							htmlFor='selectFontFamily'
							size={12}
							weight={800}
							uppercase
							dynamicLite>
							Шрифт
						</Text>
						<Select
							selected={settings.fontFamilyOption}
							options={fontFamilyOptions}
							id='selectFontFamily'
							onChange={handleSettingChange}
							name='fontFamilyOption'
						/>
					</div>

					<RadioGroup
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={handleSettingChange}
						title='Размер шрифта'
						name='fontSizeOption'
					/>

					<div className={styles.field_container}>
						<Text
							as='label'
							htmlFor='selectFontColor'
							size={12}
							weight={800}
							uppercase
							dynamicLite>
							Цвет шрифта
						</Text>
						<Select
							selected={settings.fontColor}
							options={fontColors}
							id='selectFontColor'
							onChange={handleSettingChange}
							name='fontColor'
						/>
					</div>

					<Separator />

					<div className={styles.field_container}>
						<Text
							as='label'
							htmlFor='selectBackgroundColor'
							size={12}
							weight={800}
							uppercase
							dynamicLite>
							Цвет фона
						</Text>
						<Select
							selected={settings.backgroundColor}
							options={backgroundColors}
							id='selectBackgroundColor'
							onChange={handleSettingChange}
							name='backgroundColor'
						/>
					</div>

					<div className={styles.field_container}>
						<Text
							as='label'
							htmlFor='selectContentWidth'
							size={12}
							weight={800}
							uppercase
							dynamicLite>
							Ширина контента
						</Text>
						<Select
							selected={settings.contentWidth}
							options={contentWidthArr}
							id='selectContentWidth'
							onChange={handleSettingChange}
							name='contentWidth'
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
