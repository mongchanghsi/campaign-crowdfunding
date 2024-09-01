import { ThemeEnum, useThemeUpdater } from "@/context/useThemeUpdater";
import { ThemeToggleContainer } from "./style";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeUpdater();

  return (
    <ThemeToggleContainer onClick={toggleTheme}>
      {theme === ThemeEnum.LIGHT ? "Light" : "Dark"}
    </ThemeToggleContainer>
  );
};

export default ThemeToggle;
