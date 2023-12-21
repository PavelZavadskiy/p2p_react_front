export function AdvertCreateNextPrewBlock({ changeCurrentStepIncrease, adsCurrentStep, changeCurrentStepReduce }) {
  return (
    <div className="advert_create_body_next_prew_block">
      <div className="advert_create_body_next_prew_block_wrapper">
        {adsCurrentStep > 1 && (
          <button
            className="advert_create_body_next_prew_block_button advert_create_body_next_prew_block_button_prew"
            onClick={changeCurrentStepReduce}
          >
            Previous
          </button>
        )}
        <button
          className="advert_create_body_next_prew_block_button advert_create_body_next_prew_block_button_next"
          onClick={changeCurrentStepIncrease}
        >
          Next
        </button>
      </div>
    </div>
  );
}
