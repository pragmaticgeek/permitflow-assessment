import { IOTCSubmissionProcessProps } from '@/types/OTCSubmissionProcess';

export const OTCSubmissionProcess = ({
  requirePlanSets,
}: IOTCSubmissionProcessProps) => {
  return (
    <>
      <h4 className="font-semibold">Over-the-Counter Submission Process</h4>
      <ul className="list-disc ml-8 mt-2">
        <li>A building permit is required.</li>
        {requirePlanSets ? <li>Include plan sets.</li> : null}
        <li>Submit application for OTC review.</li>
      </ul>
    </>
  );
};
