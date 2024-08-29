import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import {
  ThemeEnum,
  ThemeUpdaterProvider,
  useThemeUpdater,
} from "@/context/useThemeUpdater";
import LightTheme from "./tokens/light";
import DarkTheme from "./tokens/dark";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Theme: FC<IProps> = ({ children }) => {
  const { theme } = useThemeUpdater();

  return (
    <ThemeProvider theme={theme === ThemeEnum.LIGHT ? LightTheme : DarkTheme}>
      <ThemeUpdaterProvider>{children}</ThemeUpdaterProvider>
    </ThemeProvider>
  );
};

export default Theme;
