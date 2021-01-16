import React, { useState, useEffect } from "react";
import Router from "next/router";
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

const StepperPathway = ({ evalId }) => {
  const stepperClasses = useStepperStyles();
  // const StepButtonCustom = whiteFont ? StyledStepButton : StepButton; // OVERWRITE BY WHITEFONT
  const authUser = useSelector((state) => state.auth.user);
  const [currentReview, setCurrentReview] = useState({});

  // Done Once onload
  useEffect(() => {
      // This needs to be moved somewhere else
    const fetchCurrentReview = async () => {
      const response = await services.review.find({
        query: {
          course_id: evalId,
          user_id: authUser._id,
        },
      });
      const reviewOfAuthUser =
        response.value.total > 0 ? response.value.data[0] : {};
        // If there is no review that exist, then just an empty object
      setCurrentReview(reviewOfAuthUser);
    };
    fetchCurrentReview();
  }, []);

  // Done calculation is determined to be completed or ready for next step
  // if there is an entry atleast once
  const steps = [
    {
      stepName: "Overview & Eoc",
      done: currentReview.step1DevelopmentLevels || false,
      stepLink: "overview-&-eoc",
    },
    {
      stepName: "Read Documents",
      done: currentReview.step2Documents && currentReview.step2Documents.length>0 || false,
      stepLink: "documents",
    },

    {
      stepName: "Review Course",
      done: currentReview.step3Evaluation  && currentReview.step3Evaluation.length>0|| false,
      stepLink: "assessment",
    },

    {
      stepName: "Review & Submit",
      done: currentReview.step4ReviewComment && currentReview.step4ReviewComment.length>0 || false,
      stepLink: "review",
    },
  ];
  return (
    <Stepper alternativeLabel className={stepperClasses.stepper}>
      {steps.map(({ stepName, done = false, stepLink }, index) => (
        <Step key={stepName} active={done} connector={<StepperConnector />}>
          <StepButton
            icon={StepIcon({ done })}
            onClick={() =>
              Router.push(`/reviewer/${evalId}/${index + 1}-${stepLink}`)
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
