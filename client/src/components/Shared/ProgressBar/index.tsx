import { FC } from "react";
import {
  ProgressBarBase,
  ProgressBarContainer,
  ProgressBarCovered,
  ProgressBarLabel,
} from "./style";

interface IProps {
  currentValue: number;
  maxValue: number;
  round?: number;
  currency?: string;
  isCurrencyCrypto?: boolean;
}

const ProgressBar: FC<IProps> = ({
  currentValue,
  maxValue,
  round = 0,
  currency = "",
  isCurrencyCrypto = true,
}) => {
  const renderValue = (_value: number, _round: number) => {
    return isCurrencyCrypto
      ? `${_value.toFixed(_round)} ${currency}`
      : `${currency} ${_value.toFixed(_round)}`;
  };

  return (
    <ProgressBarContainer>
      <ProgressBarLabel>
        {renderValue(currentValue, round)} / {renderValue(maxValue, 0)}
      </ProgressBarLabel>
      <ProgressBarBase>
        <ProgressBarCovered
          towidth={
            currentValue / maxValue >= 1 ? 100 : (currentValue / maxValue) * 100
          }
        ></ProgressBarCovered>
      </ProgressBarBase>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
