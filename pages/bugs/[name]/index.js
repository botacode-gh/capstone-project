import { useRouter } from "next/router";

import ItemHeader from "@/components/ItemHeader";
import PageHeading from "@/components/PageHeading";

import bugsData from "@/lib/apiData/bugs.json";
import BugDescription from "@/components/BugDescription";
import ActionsBar from "@/components/ActionsBar";
import RemoveModal from "@/components/RemoveModal";

export default function BugDetails({ acquiredItems, isRemoveModalOpen }) {
  const router = useRouter();
  const { name } = router.query;

  if (!name) {
    return <PageHeading>bugging bugs...</PageHeading>;
  }

  const bug = bugsData.find(
    (bug) => bug.name.toLowerCase() === name.toLowerCase()
  );
  const acquiredBug = acquiredItems.find((item) => item.name === bug.name);

  return (
    <>
      {isRemoveModalOpen && (
        <RemoveModal item={acquiredBug} acquiredItems={acquiredItems} />
      )}
      <ActionsBar item={bug} acquiredItem={acquiredBug} />
      <ItemHeader title={bug.name} quotes={bug.catchphrases} />
      <BugDescription bug={acquiredBug ? acquiredBug : bug} />
    </>
  );
}
