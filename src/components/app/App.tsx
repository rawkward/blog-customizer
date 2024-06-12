import { useState } from "react";
import { defaultArticleState, ArticleStateType } from "src/constants/articleProps";
import { ArticleParamsForm } from "../article-params-form";
import { Article } from "../article";
import { CSSProperties } from "react";

import styles from './app.module.scss'

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleSettingsChange = (newSettings: ArticleStateType) => {
		setArticleState(newSettings);
	};

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm handleSettingsChange={handleSettingsChange} />
			<Article />
		</div>
	);
};