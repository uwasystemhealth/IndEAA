export const getIndexOfEOCMatch = (eocGeneralAndSpecific, eocReviews) =>
  eocReviews.findIndex((review) =>
    review.eocNumber.includes(eocGeneralAndSpecific)
  );

export const getDetailsOfEntireEOC = (eocGeneralAndSpecific,eocReviews) => {
  const matchedIndex = getIndexOfEOCMatch(eocGeneralAndSpecific, eocReviews);
  const noReviewFound = matchedIndex === -1;

  // Setting Initial Value for no entry in database
  const rating = noReviewFound
    ? 0
    : eocReviews[matchedIndex].developmentLevel;
  const justification = noReviewFound
    ? null
    : eocReviews[matchedIndex].justification;
  const eocsInSameJustification = noReviewFound
    ? [eocGeneralAndSpecific]
    : eocReviews[matchedIndex].eocNumber;

  return { rating, justification, eocsInSameJustification };
};

export const getStaticDetailsOfEOC = (eocGeneralAndSpecific,evaluationID) => {
  if(eocGeneralAndSpecific)
  {
    const eocs = getEOCInfo(evaluationID);
    const [eocSetNum,eocNum] = eocGeneralAndSpecific?.split('.');
    const set = eocs?.find(({setNum})=> setNum==eocSetNum);
    return set?.EOCS.find(({EOCNum})=> EOCNum==eocNum);
  }
  return null;
};

export const getEOCInfo = () => {
  return [
    {
      _id: '1',
      setNum: 1,
      setName: 'Knowledge and Skill Base',
      EOCS: [
        {
          _id: '2',
          EOCNum: 1,
          desc:
                    'Comprehensive, theory based understanding of the underpinning natural and physical sciences and the engineering fundamentals applicable to the engineering discipline.',
          indicatorsOfAttainment:['Engages with the engineering discipline at a phenomenological level, applying sciences and engineering fundamentals to systematic investigation, interpretation, analysis and innovative solution of complexproblems and broader aspects of engineering practice.']
        },
        {
          _id: '3',
          EOCNum: 2,
          desc:
                    'Conceptual understanding of the mathematics, numerical analysis, statistics, and computer and information sciences which underpin the engineering discipline',
          indicatorsOfAttainment:['Develops and fluently appliesrelevant investigation analysis, interpretation, assessment, characterisation, prediction, evaluation, modelling, decision making, measurement, evaluation, knowledge management and communication tools and techniques pertinent to the engineering discipline.']
        },
        {
          _id: '4',
          EOCNum: 3,
          desc:
                    'In-depth understanding of specialist bodies of knowledge within the engineering discipline.',
          indicatorsOfAttainment:['Proficiently appliesadvanced technical knowledge and skills in at least one specialist practice domain of the engineering discipline.']
        },
        {
          _id: '5',
          EOCNum: 4,
          desc:
                    'Discernment of knowledge development and research directions within the engineering discipline.',
          indicatorsOfAttainment:[
            'Identifies and critically appraisescurrent developments, advanced technologies, emerging issues and interdisciplinary linkages in at least one specialist practice domain of the engineering discipline.',
            'Interprets and appliesselected research literature to inform engineering application in at least one specialist domain of the engineering discipline.'
          ]
        },
        {
          _id: '6',
          EOCNum: 5,
          desc:
                    'Knowledge of engineering design practice and contextual factors impacting the engineering discipline.',
          indicatorsOfAttainment:[
            'Identifies and applies systematic principles of engineering design relevant to the engineering discipline.',
            'Identifies and understands the interactions between engineering systems and people in the social, cultural, environmental, commercial, legal and political contexts in which they operate, including both the positive role of engineering in sustainable development and the potentially adverse impacts of engineering activity in the engineering discipline. ', 
            'Appreciates the issues associated with international engineering practice and global operating contexts',
            'Is aware ofthe founding principles of human factors relevant to the engineering discipline.',
            'Is aware ofthe fundamentals of business and enterprise management.',
            'Identifiesthe structure, roles and capabilities of the engineering workforce.'
          ]
        },
        {
          _id: '7',
          EOCNum: 6,
          desc:
                    'Understanding of the scope, principles, norms, accountabilities and bounds of sustainable engineering practice in the specific discipline.',
          indicatorsOfAttainment: [
            'Appreciates the basis and relevance of standards and codes of practice, as well as legislative and statutory requirements applicable to the engineering discipline.',
            'Appreciates the principles of safety engineering, risk management and the health and safety responsibilities of the professional engineer, including legislative requirements applicable to the engineering discipline.',
            'Appreciatesthe social, environmental and economic principles of sustainable engineering practice.',
            'Understands the fundamental principles of engineering project management as a basis for planning, organising and managing resources.',
            'Appreciates the formal structures and methodologies of systems engineering as a holistic basis for managing complexity and sustainability in engineering practice. '
          ]
        },
      ],
    },
    {
      _id: '8',
      setNum: 2,
      setName: 'Engineering Application Ability',
      EOCS: [
        {
          _id: '9',
          EOCNum: 1,
          desc:
                    'Application of established engineering methods to complex engineering problem solving.',
          indicatorsOfAttainment:[
            'Identifies, discerns and characterises salient issues, determines and analyses causes and effects, justifies and applies appropriate simplifying assumptions, predicts performance and behaviour, synthesises solution strategies and develops substantiated conclusions.',
            'Ensures that all aspects of an engineering activity are soundly based on fundamental principles - by diagnosing, and taking appropriate action with data, calculations, results, proposals, processes, practices, and documented information that may be ill-founded, illogical, erroneous, unreliable or unrealistic.',
            'Competently addresses complex engineering problems which involve uncertainty, ambiguity, imprecise information and wide-ranging and sometimes conflicting technical and non-technical factors.',
            'Investigates complex problems using research-based knowledge and research methods.',
            'Partitions problems, processes or systems into manageable elements for the purposes of analysis, modelling or design and then re-combines to form a whole, with the integrity and performance of the overall system as the paramount consideration.',
            'Conceptualises alternative engineering approaches and evaluates potential outcomes against appropriate criteria to justify an optimal solution choice.',
            'Critically reviews and applies relevant standards and codes of practice underpinning the engineering discipline and nominated specialisations.',
            'Identifies, quantifies, mitigates and manages technical, health, environmental, safety and other contextual risks associated with engineering application in the designated engineering discipline.',
            'Interprets and ensures compliance with relevant legislative and statutory requirements applicable to the engineering discipline.'
          ]
        },
        {
          _id: '10',
          EOCNum: 2,
          desc:
                    'Fluent application of engineering techniques, tools and resources.',
          indicatorsOfAttainment:[
            'Proficiently identifies, selects and applies the materials, components, devices, systems, processes, resources, plant and equipment relevant to the engineering discipline.',
            'Constructs or selects and applies from a qualitative description of a phenomenon, process, system, component or device a mathematical, physical or computational model based on fundamental scientific principles and justifiable simplifying assumptions.',
            'Determines properties, performance, safe working limits, failure modes, and other inherent parameters of materials, components and systems relevant to the engineering discipline.',
            'Applies a wide range of engineering tools for analysis, simulation, visualisation, synthesis and design, including assessing the accuracy and limitations of such tools, and validation of their results.',
            'Applies formal systems engineering methods to address the planning and execution of complex, problem solving and engineering projects.',
            'Designs and conducts experiments, analyses and interprets result data and formulates reliable conclusions.',
            'Analyses sources of error in applied models and experiments; eliminates, minimises or compensates for such errors; quantifies significance of errors to any conclusions drawn.',
            'Safely applies laboratory, test and experimental procedures appropriate to the engineering discipline.',
            'Understands the need for systematic management of the acquisition, commissioning, operation, upgrade, monitoring and maintenance of engineering plant, facilities, equipment and systems.',
            'Understands the role of quality management systems, tools and processes within a culture of continuous improvement.'
          ]
        },
        {
          _id: '11',
          EOCNum: 3,
          desc:
                    'Application of systematic engineering synthesis and design processes.',
          indicatorsOfAttainment:['Proficiently applies technical knowledge and open ended problem solving skills as well as appropriate tools and resources to design components, elements, systems, plant, facilities and/or processes to satisfy user requirements.',
            'Addresses broad contextual constraints such as social, cultural, environmental, commercial, legal political and human factors, as well as health, safety and sustainability imperatives as an integral part of the design process.',
            'Executes and leads a whole systems design cycle approach including tasks such as: determining client requirements and identifying the impact of relevant contextual factors, including business planning and costing targets; systematically addressing sustainability criteria; working within projected development, production and implementation constraints; eliciting, scoping and documenting the required outcomes of the design task and defining acceptance criteria; identifying assessing and managing technical, health and safety risks integral to the design process; writing engineering specifications, that fully satisfy the formal requirements; ensuring compliance with essential engineering standards and codes of practice; partitioning the design task into appropriate modular, functional elements; that can be separately addressed and subsequently integrated through defined interfaces; identifying and analysing possible design approaches and justifying an optimal approach; developing and completing the design using appropriate engineering principles, tools, and processes; integrating functional elements to form a coherent design solution; quantifying the materials, components, systems, equipment, facilities, engineering resources and operating arrangements needed for implementation of the solution; checking the design solution for each element and the integrated system against the engineering specifications; devising and documenting tests that will verify performance of the elements and the integrated realisation; prototyping/implementing the design solution and verifyingperformance against specification; documenting, commissioning and reporting the design outcome.',
            'Is aware of the accountabilities of the professional engineer in relation to the ‘design authority’ role.'
                                            
          ]
        },
        {
          _id: '12',
          EOCNum: 4,
          desc:
                    'Application of systematic approaches to the conduct and management of engineering projects.',
          indicatorsOfAttainment:[
            'Contributes to and/or manages complex engineering project activity, as a member and/or as the leader of an engineering team.',
            'Seeks out the requirements and associated resources and realistically assesses the scope, dimensions, scale of effort and indicative costs of a complex engineering project.',
            'Accommodates relevant contextual issues into all phases of engineering project work, including the fundamentals of business planning and financial management',
            'Proficiently applies basic systems engineering and/or project management tools and processes to the planning and execution of project work, targeting the delivery of a significant outcome to a professional standard.',
            'Is aware of the need to plan and quantify performance over the full life-cycle of a project, managing engineering performance within the overall implementation context.',
            'Demonstrates commitment to sustainable engineering practices and the achievement of sustainable outcomes in all facets of engineering project work.'
          ]
        },
      ],
    },
    {
      _id: '13',
      setNum: 3,
      setName: 'Professional and Personal Attributes',
      EOCS: [
        {
          _id: '14',
          EOCNum: 1,
          desc: 'Ethical conduct and professional accountability',
          indicatorsOfAttainment:[
            'Demonstrates commitment to uphold the Engineers Australia Code of Ethics, and established norms of professional conduct pertinent to the engineering discipline.',
            'Understands the need for ‘due-diligence’ in certification, compliance and risk management processes.',
            'Understands the accountabilities of the professional engineer and the broader engineering team for the safety of other people and for protection of the environment.',
            'Is aware of the fundamental principles of intellectual property rights and protection.'
          ]
        },
        {
          _id: '15',
          EOCNum: 2,
          desc:
                    'Effective oral and written communication in professional and lay domains',
          indicatorsOfAttainment:[
            'Is proficient inlistening, speaking, reading and writing English, including: comprehending critically and fairly the viewpoints of others; expressing information effectively and succinctly, issuing instruction, engaging in discussion, presenting arguments and justification, debating and negotiating - to technical and non-technical audiences and using textual, diagrammatic, pictorial and graphical media best suited to the context; representing an engineering position, or the engineering profession at large to the broader community; appreciating the impact of body language, personal behaviour and other non-verbal communication processes, as well as the fundamentals of human social behaviour and their cross-cultural differences.',
            'Prepares high quality engineering documents such as progress and project reports, reports of investigations and feasibility studies, proposals, specifications, design records, drawings, technical descriptions and presentations pertinent to the engineering discipline.'
          ]
        },
        {
          _id: '16',
          EOCNum: 3,
          desc: 'Creative, innovative and pro-active demeanour',
          indicatorsOfAttainment:['Applies creative approaches to identify and develop alternative concepts, solutions and procedures, appropriately challenges engineering practices from technical and non-technical viewpoints; identifies new technological opportunities. ',
            'Seeks out new developments in the engineering discipline and specialisations and applies fundamental knowledge and systematic processes to evaluate and report potential.',
            'Is aware of broader fields of science, engineering, technology and commerce from which new ideas and interfaces may be drawn and readily engages with professionals from these fields to exchange ideas.',
                                            
          ]
        },
        {
          _id: '17',
          EOCNum: 4,
          desc: 'Professional use and management of information',
          indicatorsOfAttainment:['Is proficient in locating and utilising information -including accessing, systematically searching, analysing, evaluating and referencing relevant published works and data; is proficient in the use of indexes, bibliographic databases and other search facilities.',
            'Critically assesses the accuracy, reliability and authenticity of information.',
            'Is aware of common document identification, tracking and control procedures.'
          ]
        },
        {
          _id: '18',
          EOCNum: 5,
          desc: 'Orderly management of self, and professional conduct',
          indicatorsOfAttainment:['Demonstrates commitment to critical self-review and performance evaluation against appropriate criteria as a primary means of tracking personal development needs and achievements.',
            'Understands the importance of being a member of aprofessional and intellectual community, learning from its knowledge and standards, and contributing to their maintenance and advancement.',
            'Demonstrates commitment to life-long learning and professional development.',
            'Manages time and processes effectively, prioritises competing demands to achieve personal, career and organisational goals and objectives.',
            'Thinks critically and applies an appropriate balance of logic and intellectual criteria to analysis, judgement and decision making.',
            'Presents a professional image in all circumstances, including relations with clients, stakeholders, as well as with professional and technical colleagues across wide ranging disciplines.'
          ]
        },
        {
          _id: '19',
          EOCNum: 6,
          desc: 'Effective team membership and team leadership',
          indicatorsOfAttainment:['Understands the fundamentals of team dynamics and leadership.',
            'Functions as an effective member or leader of diverse engineering teams, including those with multi-level, multi-disciplinary and multi-cultural dimensions.',
            'Earns the trust and confidence of colleagues through competent and timely completion of tasks.',
            'Recognises the value of alternative and diverse viewpoints, scholarly advice and the importance of professional networking.',
            'Confidently pursues and discerns expert assistance and professional advice.',
            'Takes initiative and fulfils the leadership role whilst respecting the agreed roles of others.'
          ]
        },
      ],
    },
  ];
};

// This is by order
export const developmentLevel = [
  {
    short: 'Foundational',
    meaning: 'Developing a foundation for university level study'
  },
  {
    short: 'Broad and Coherent',
    meaning: 'Sufficient capability to enter the workforce as a non-engineer'
  },
  {
    short: 'Advanced',
    meaning: 'Sufficient capability for professional practice as a starting engineer'
  },
  {
    short: 'Specialist',
    meaning: 'Selected areas of strength beyond the requirement for entering professional practice'
  },
];

// Dictionary Converter format {level: "short"}
export const developmentLevelToString = developmentLevel.reduce((accumulator,currentValue,currentIndex)=>({
  ...accumulator,
  [currentIndex+1]:`Level ${currentIndex+1} - ${currentValue.short}`
}), {0:'Select a level'});

// Dictionary Converter format {"short":level}
export const stringToDevelopmentLevel = developmentLevel.reduce((accumulator,currentValue,currentIndex)=>({
  ...accumulator,
  [`Level ${currentIndex+1} - ${currentValue.short}`]:currentIndex+1
}), {'Select a level':0});


