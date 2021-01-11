// Get all available roles permissions of a user
export const getAvailablePermissionsOfUser = (permissions) => {
  return new Set(permissions.map((permission) => permission.role).sort());
};

export const getEOCInfo = (evaluationID) => {
  return [
    {
      _id: "1",
      setNum: 1,
      setName: "Knowledge and Skill Base",
      EOCS: [
        {
          _id: "2",
          EOCNum: 1,
          desc:
            "Comprehensive, theory based understanding of the underpinning natural and physical sciences and the engineering fundamentals applicable to the engineering discipline.",
        },
        {
          _id: "3",
          EOCNum: 2,
          desc:
            "Conceptual understanding of the mathematics, numerical analysis, statistics, and computer and information sciences which underpin the engineering discipline",
        },
        {
          _id: "4",
          EOCNum: 3,
          desc:
            "In-depth understanding of specialist bodies of knowledge within the engineering discipline.",
        },
        {
          _id: "5",
          EOCNum: 4,
          desc:
            "Discernment of knowledge development and research directions within the engineering discipline.",
        },
        {
          _id: "6",
          EOCNum: 5,
          desc:
            "Knowledge of engineering design practice and contextual factors impacting the engineering discipline.",
        },
        {
          _id: "7",
          EOCNum: 6,
          desc:
            "Understanding of the scope, principles, norms, accountabilities and bounds of sustainable engineering practice in the specific discipline.",
        },
      ],
    },
    {
      _id: "8",
      setNum: 2,
      setName: "Engineering Application Ability",
      EOCS: [
        {
          _id: "9",
          EOCNum: 1,
          desc:
            "Application of established engineering methods to complex engineering problem solving.",
        },
        {
          _id: "10",
          EOCNum: 2,
          desc:
            "Fluent application of engineering techniques, tools and resources.",
        },
        {
          _id: "11",
          EOCNum: 3,
          desc:
            "Application of systematic engineering synthesis and design processes.",
        },
        {
          _id: "12",
          EOCNum: 4,
          desc:
            "Application of systematic approaches to the conduct and management of engineering projects.",
        },
      ],
    },
    {
      _id: "13",
      setNum: 3,
      setName: "Professional and Personal Attributes",
      EOCS: [
        {
          _id: "14",
          EOCNum: 1,
          desc: "Ethical conduct and professional accountability",
        },
        {
          _id: "15",
          EOCNum: 2,
          desc:
            "Effective oral and written communication in professional and lay domains",
        },
        {
          _id: "16",
          EOCNum: 3,
          desc: "Creative, innovative and pro-active demeanour",
        },
        {
          _id: "17",
          EOCNum: 4,
          desc: "Professional use and management of information",
        },
        {
          _id: "18",
          EOCNum: 5,
          desc: "Orderly management of self, and professional conduct",
        },
        {
          _id: "19",
          EOCNum: 6,
          desc: "Effective team membership and team leadership",
        },
      ],
    },
  ];
};

export const permissions = ["Administrator", "Coordinator", "Reviewer"];

// Icons for Each Different User
import Placeholder from "@material-ui/icons/Mood";

// Consistent Casing to different Permissions
export const roleIcons = {
  Administrator: Placeholder,
  Reviewer: Placeholder,
  Coordinator: Placeholder,
};
