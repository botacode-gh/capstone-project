import {
  getLocationText,
  getMonthsText,
  getRarityText,
  getTimeText,
} from "@/lib/utils";
import DescriptionBox from "../DescriptionBox";
import AcquiredDate from "../AcquiredDate";

export default function BugDescription({ bug }) {
  const { rarity, location } = bug;
  const { months, time } = bug.north.availability_array[0];

  const rarityText = getRarityText(rarity);
  const locationText = getLocationText(location);
  const monthsText = getMonthsText(months);
  const timeText = getTimeText(time);
  const article = /[aeiou]/i.test(rarityText[0]) ? "An" : "A";

  return (
    <DescriptionBox item={bug}>
      <p>
        {article} {rarityText} bug, found {locationText.toLowerCase()}{" "}
        {monthsText}, {timeText}.
      </p>
      <AcquiredDate item={bug} />
    </DescriptionBox>
  );
}
