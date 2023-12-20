import { useEffect, useState, useRef } from 'react';

export function AdvertCreateSteps({ adsCurrentStep }) {
  const step_1 = useRef();
  const step_2 = useRef();
  const step_3 = useRef();

  useEffect(() => {
    console.log(adsCurrentStep);

    const steps = [step_1, step_2, step_3];

    const interval = setInterval(() => {
      if (step_1.current && step_2.current && step_3) {
        for (let i = 0; i < steps.length; i++) {
          if (i < adsCurrentStep) {
            steps[i].current.classList.add('advert_create_steps_item_marker_active');
          }
        }
        clearInterval(interval);
      }
    }, 100);
  }, [adsCurrentStep]);

  return (
    <div className="advert_create_steps_wrapper">
      <div className="advert_create_steps_item_wrapper">
        <div className="advert_create_steps_item ">
          <p className="advert_create_steps_item_title">Set Type & Price</p>
          <div className="advert_create_steps_item_marker wait" ref={step_1}>
            <span className="advert_create_steps_item_marker_text">1</span>
          </div>
        </div>

        <div className="advert_create_steps_item ">
          <p className="advert_create_steps_item_title">Set Total Amount & Payment Method</p>
          <div className="advert_create_steps_item_marker wait" ref={step_2}>
            <span className="advert_create_steps_item_marker_text">2</span>
          </div>
        </div>

        <div className="advert_create_steps_item">
          <p className="advert_create_steps_item_title">Set Remarks & Automatic Response</p>
          <div className="advert_create_steps_item_marker" ref={step_3}>
            <span className="advert_create_steps_item_marker_text">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
