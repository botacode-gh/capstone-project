import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import PageHeading from "@/components/PageHeading";
import ItemQuote from "@/components/ItemQuote";
import AnimalDescription from "@/components/AnimalDescription";
import MuseumGuidepost from "@/components/MuseumGuidepost";
import PriceDisplay from "@/components/PriceDisplay";
import UnlockDate from "@/components/UnlockDate";
import BackToMainButton from "@/components/BackToMainButton";

import { DUMMY_BUGS } from "@/lib/dummyData";
import ModelMade from "@/components/ModelMade";

export default function BugDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const storedBugs = JSON.parse(localStorage.getItem("bugs"));
    setBugs(storedBugs || DUMMY_BUGS);
  }, []);

  function handleModelMadeChange(slug) {
    const updatedBugs = bugs.map((bug) =>
      bug.slug === slug ? { ...bug, isModelled: !bug.isModelled } : bug
    );
    setBugs(updatedBugs);
    localStorage.setItem("bugs", JSON.stringify(updatedBugs));
  }

  const bug = bugs.find((bug) => bug.slug === slug);

  if (!bug) {
    return <h1>Loading bug (or trying to)...</h1>;
  }

  const { name, quotes, iconSource, museum, price, unlockDate } = bug;
  const { displayLocation, mapSource } = museum;
  const randomizedQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      <BackToMainButton />
      <PageHeading>{name}</PageHeading>
      <ItemQuote>{randomizedQuote || quotes[0]}</ItemQuote>
      <AnimalDescription species={bug} />
      <Image src={iconSource} alt={`${name} icon`} width={300} height={300} />
      <PriceDisplay price={price} />
      <ModelMade bug={bug} onChange={() => handleModelMadeChange(bug.slug)} />
      <MuseumGuidepost
        displayLocation={displayLocation}
        mapSource={mapSource}
      />
      <UnlockDate date={unlockDate} type="fish" />
    </>
  );
}
