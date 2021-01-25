import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles, styled } from "@material-ui/core/styles";

// ICONS
import Done from "@material-ui/icons/CheckCircleOutline";
import NotDone from "@material-ui/icons/RadioButtonUnchecked";

// CORE COMPONENTS
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

// STYLES
import stepperStyle from "assets/jss/custom/stepper.js";
import { StepperConnector } from "assets/jss/custom/stepper";
import { TextareaAutosize } from "@material-ui/core";
const useStepperStyles = makeStyles(stepperStyle);

// Redux
import { useSelector } from "react-redux";
import { services } from "store/feathersClient";

// WORKAROUND CHANGE COLOR OF STEP LABEL
const StyledStepButton = styled(StepButton)({
  "& .MuiStepLabel-active": {
    color: "#FFFF",
  },
});

export const StepIcon = (props) => {
  const stepperClasses = useStepperStyles();
  const icon = props.done ? <Done></Done> : <NotDone></NotDone>;
  return (
    <div
      className={classnames(stepperClasses.root, {
        [stepperClasses.active]: props.done,
      })}
    >
      {icon}
    </div>
  );
};

const StepperPathway = ({ review }) => {
  const stepperClasses = useStepperStyles();
  const router = useRouter();

  // const StepButtonCustom = whiteFont ? StyledStepButton : StepButton; // OVERWRITE BY WHITEFONT

  // Done calculation is determined to be completed or ready for next step
  // if there is an entry atleast once
  const steps = [
    {
      stepName: "Overview & Eoc",
      done: Boolean(review.step1DevelopmentLevels),
      stepLink: "overview-and-eoc",
    },
    {
      stepName: "Read Documents",
      done:
        Boolean((review.step2Documents && review.step2Documents.length > 0)),
      stepLink: "documents",
    },

    {
      stepName: "Review Course",
      done:
        Boolean((review.step3Evaluation && review.step3Evaluation.length > 0)),
      stepLink: "assessment",
    },

    {
      stepName: "Review & Submit",
      done: Boolean(review.submittedDate),
      stepLink: "review",
    },
  ];
  return (
    <Stepper alternativeLabel nonLinear className={stepperClasses.stepper}>
      {steps.map(({ stepName, done = false, stepLink }, index) => (
        <Step key={stepName} active={done} connector={<StepperConnector />}>
          <StepButton
            icon={StepIcon({ done })}
            onClick={() =>
              router.push(
                `/reviewer/${review.course_id}/${index + 1}-${stepLink}`
              )
            }
          >
            {stepName}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperPathway;
