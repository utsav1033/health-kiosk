/**
 * YoloHealth Test Parameters Database
 * 
 * Detailed information about all parameters measured by YoloHealth tests.
 * Includes normal ranges, explanations, and clinical significance.
 * Educational content for patients.
 */

export interface ParameterInfo {
  name: string;
  abbreviation?: string;
  description: string;
  whatItMeasures: string;
  normalRange: string;
  unit: string;
  abnormalIndicates: string[];
  clinicalSignificance: string;
}

export interface TestParameterMapping {
  testName: string;
  parameters: ParameterInfo[];
}

export const TEST_PARAMETERS: Record<string, ParameterInfo[]> = {
  'Heart Rate': [
    {
      name: 'Heart Rate',
      abbreviation: 'HR',
      description: 'Number of times your heart beats per minute',
      whatItMeasures:
        'How many times your heart contracts (beats) each minute during rest',
      normalRange: '60-100 bpm',
      unit: 'beats per minute (bpm)',
      abnormalIndicates: [
        'Too fast (>100 bpm): Tachycardia, stress, fever, thyroid issues',
        'Too slow (<60 bpm): Bradycardia, athletic conditioning, heart block',
      ],
      clinicalSignificance:
        'Heart rate indicates cardiac efficiency and overall cardiovascular health. Resting heart rate is an important indicator of fitness and stress levels.',
    },
  ],

  'Rhythm': [
    {
      name: 'Cardiac Rhythm',
      abbreviation: 'Rhythm',
      description: 'Pattern and regularity of your heartbeats',
      whatItMeasures: 'Whether your heartbeats follow a regular, predictable pattern',
      normalRange: 'Regular (consistent intervals between beats)',
      unit: 'Qualitative (Regular/Irregular)',
      abnormalIndicates: [
        'Irregular rhythm: Atrial fibrillation, arrhythmias, heart disease',
        'Skipped beats: Premature contractions',
        'Abnormal patterns: Electrical conduction disorders',
      ],
      clinicalSignificance:
        'Regular rhythm is essential for efficient blood flow. Irregular rhythms may require further investigation and treatment.',
    },
  ],

  'QT Interval': [
    {
      name: 'QT Interval',
      abbreviation: 'QT',
      description: 'Time it takes for your heart to recharge between beats',
      whatItMeasures:
        'Duration of electrical repolarization phase of your heart (ventricular depolarization and repolarization)',
      normalRange: '350-450 ms (varies by age, sex, heart rate)',
      unit: 'milliseconds (ms)',
      abnormalIndicates: [
        'Prolonged QT: Risk of dangerous arrhythmias, medication side effects, electrolyte imbalance',
        'Short QT: Rare genetic condition, risk of sudden cardiac death',
      ],
      clinicalSignificance:
        'QT interval helps identify risk of sudden cardiac death. Important screening tool for medication safety.',
    },
  ],

  'ST Segment': [
    {
      name: 'ST Segment',
      abbreviation: 'ST',
      description: 'Flat section of heartbeat line between contractions',
      whatItMeasures:
        'The electrical segment between ventricular depolarization and repolarization',
      normalRange: 'At baseline (isoelectric line), no elevation or depression',
      unit: 'Qualitative (Normal/Elevated/Depressed)',
      abnormalIndicates: [
        'ST elevation: Acute heart attack (myocardial infarction)',
        'ST depression: Ischemia, coronary artery disease, cardiac stress',
        'T-wave abnormalities: Various cardiac conditions',
      ],
      clinicalSignificance:
        'ST segment changes are critical indicators of heart attack or severe coronary disease. Changes here require immediate medical attention.',
    },
  ],

  'PR Interval': [
    {
      name: 'PR Interval',
      abbreviation: 'PR',
      description: 'Time from start of heartbeat to contraction of heart chambers',
      whatItMeasures:
        'Duration of electrical conduction from atria to ventricles (AV node conduction time)',
      normalRange: '120-200 ms',
      unit: 'milliseconds (ms)',
      abnormalIndicates: [
        'Short PR: Pre-excitation syndromes (like Wolff-Parkinson-White)',
        'Long PR: Conduction delays (first-degree AV block)',
        'Variable PR: Second-degree AV block',
      ],
      clinicalSignificance:
        'Abnormal PR intervals indicate problems with electrical conduction through the heart. May require pacemaker or other intervention.',
    },
  ],

  'QRS Duration': [
    {
      name: 'QRS Duration',
      abbreviation: 'QRS',
      description: 'Time for electrical signal to spread across heart chambers',
      whatItMeasures:
        'Duration of ventricular depolarization (contraction signal spread)',
      normalRange: '80-120 ms',
      unit: 'milliseconds (ms)',
      abnormalIndicates: [
        'Wide QRS (>120 ms): Bundle branch blocks, ventricular arrhythmias, pacemaker',
        'Very wide QRS: Severe conduction abnormalities, drug effects',
      ],
      clinicalSignificance:
        'QRS duration indicates how efficiently electrical signals spread through the ventricles. Wide complexes suggest conduction problems.',
    },
  ],

  'Heart Rate Variability': [
    {
      name: 'Heart Rate Variability',
      abbreviation: 'HRV',
      description: 'Variation in time intervals between heartbeats',
      whatItMeasures:
        'How much your heart rate changes from beat to beat (indicator of nervous system balance)',
      normalRange: 'Higher is better (>50 ms standard deviation indicates good health)',
      unit: 'milliseconds (ms)',
      abnormalIndicates: [
        'Low HRV: Stress, fatigue, overtraining, heart disease, autonomic dysfunction',
        'Very high HRV: May indicate arrhythmias',
      ],
      clinicalSignificance:
        'HRV reflects autonomic nervous system health. Low HRV indicates stress and may predict health problems. High HRV indicates good cardiovascular fitness.',
    },
  ],

  'Atrial Fibrillation Detection': [
    {
      name: 'Atrial Fibrillation (AFib)',
      abbreviation: 'AFib',
      description: 'Detection of irregular, rapid heartbeats in upper chambers',
      whatItMeasures:
        'Presence of irregular electrical activity in the atria (upper heart chambers)',
      normalRange: 'Absent (normal)',
      unit: 'Qualitative (Present/Absent)',
      abnormalIndicates: [
        'AFib present: Irregular rhythm increases stroke risk, may need anticoagulation therapy',
        'Paroxysmal AFib: Intermittent episodes of AFib',
      ],
      clinicalSignificance:
        'Atrial fibrillation significantly increases risk of blood clots and stroke. Early detection is important for prevention.',
    },
  ],

  'Systolic Pressure': [
    {
      name: 'Systolic Blood Pressure',
      abbreviation: 'SBP',
      description:
        'Pressure when your heart contracts and pumps blood (top number)',
      whatItMeasures:
        'Force exerted on artery walls when heart beats and pushes blood out',
      normalRange: '90-120 mmHg',
      unit: 'millimeters of mercury (mmHg)',
      abnormalIndicates: [
        'High (120-139): Elevated, may need lifestyle changes',
        'Very high (≥140): Stage 2 hypertension, needs treatment',
        'Low (<90): Hypotension, may cause dizziness or fatigue',
      ],
      clinicalSignificance:
        'High blood pressure is a major risk factor for heart disease and stroke. Regular monitoring helps prevent complications.',
    },
  ],

  'Diastolic Pressure': [
    {
      name: 'Diastolic Blood Pressure',
      abbreviation: 'DBP',
      description:
        'Pressure when your heart relaxes between beats (bottom number)',
      whatItMeasures:
        'Baseline pressure in arteries when the heart is at rest between beats',
      normalRange: '60-80 mmHg',
      unit: 'millimeters of mercury (mmHg)',
      abnormalIndicates: [
        'High (80-89): Elevated, may need lifestyle changes',
        'Very high (≥90): Stage 2 hypertension, needs treatment',
        'Low (<60): Hypotension, may affect organ perfusion',
      ],
      clinicalSignificance:
        'High diastolic pressure indicates arteries are under constant strain. Important for cardiovascular risk assessment.',
    },
  ],

  'Mean Arterial Pressure': [
    {
      name: 'Mean Arterial Pressure',
      abbreviation: 'MAP',
      description:
        'Average pressure in your arteries during the cardiac cycle',
      whatItMeasures:
        'Overall average blood pressure (weighted toward diastolic pressure)',
      normalRange: '70-100 mmHg',
      unit: 'millimeters of mercury (mmHg)',
      abnormalIndicates: [
        'High MAP: Hypertension, increased cardiovascular risk',
        'Low MAP: Poor perfusion, shock risk',
      ],
      clinicalSignificance:
        'MAP represents the actual pressure that perfuses organs. Must stay above 60 mmHg for organ function.',
    },
  ],

  'Pulse Pressure': [
    {
      name: 'Pulse Pressure',
      abbreviation: 'PP',
      description: 'Difference between systolic and diastolic pressure',
      whatItMeasures:
        'Arterial elasticity and stiffness (systolic minus diastolic pressure)',
      normalRange: '30-40 mmHg',
      unit: 'millimeters of mercury (mmHg)',
      abnormalIndicates: [
        'Wide PP (>60): Arterial stiffness, atherosclerosis, increased cardiovascular risk',
        'Narrow PP (<20): Poor cardiac output, shock',
      ],
      clinicalSignificance:
        'Pulse pressure indicates artery flexibility. Wide pulse pressure is a sign of aging and vascular disease.',
    },
  ],

  'Fasting Glucose': [
    {
      name: 'Fasting Blood Glucose',
      abbreviation: 'FBG',
      description: 'Blood sugar level after 8+ hours without food',
      whatItMeasures:
        'Amount of glucose (sugar) in your bloodstream after overnight fasting',
      normalRange: '70-100 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated (100-125 mg/dL): Prediabetes, risk of diabetes',
        'High (≥126 mg/dL): Diabetes',
        'Low (<70): Hypoglycemia, can cause fainting, confusion',
      ],
      clinicalSignificance:
        'Fasting glucose is primary screening test for diabetes and metabolic disorders. Early detection allows prevention.',
    },
  ],

  'Random Glucose': [
    {
      name: 'Random Blood Glucose',
      abbreviation: 'RBG',
      description: 'Blood sugar level at any time of day, with or without food',
      whatItMeasures:
        'Blood glucose level regardless of meal status (snapshot of current blood sugar)',
      normalRange: '<140 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated (140-200 mg/dL): Possible diabetes or prediabetes',
        'High (>200 mg/dL): Likely diabetes, needs further testing',
      ],
      clinicalSignificance:
        'Random glucose is quick screening tool. May need fasting glucose and HbA1c for confirmation.',
    },
  ],

  'Post-Prandial Glucose': [
    {
      name: 'Post-Prandial Blood Glucose',
      abbreviation: 'PPBG',
      description: 'Blood sugar level 2 hours after eating',
      whatItMeasures: 'How well your body processes glucose after a meal',
      normalRange: '<140 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Impaired glucose tolerance, metabolic dysfunction, diabetes',
        'Very high (>180): Uncontrolled diabetes',
      ],
      clinicalSignificance:
        'Post-meal glucose shows how your body handles food. Abnormal values indicate metabolic problems even if fasting glucose is normal.',
    },
  ],

  'Total Cholesterol': [
    {
      name: 'Total Cholesterol',
      abbreviation: 'TC',
      description: 'Total amount of cholesterol in your blood',
      whatItMeasures:
        'Sum of HDL, LDL, and VLDL cholesterol (all cholesterol particles)',
      normalRange: '<200 mg/dL (desirable)',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Borderline high (200-239): Increased heart disease risk',
        'High (≥240): Significantly increased risk, needs treatment',
      ],
      clinicalSignificance:
        'Total cholesterol is major risk factor for atherosclerosis and heart disease. Should be combined with HDL/LDL ratio.',
    },
  ],

  'HDL Cholesterol': [
    {
      name: 'HDL Cholesterol (Good Cholesterol)',
      abbreviation: 'HDL',
      description:
        'High-density lipoprotein - removes cholesterol from arteries',
      whatItMeasures:
        'Protective cholesterol that removes harmful cholesterol from blood',
      normalRange: '>40 mg/dL (men), >50 mg/dL (women)',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Low: Increased heart disease risk, metabolic syndrome',
        'Very low (<30): High cardiovascular risk',
      ],
      clinicalSignificance:
        'Higher HDL is protective against heart disease. Low HDL is independent cardiovascular risk factor. Exercise and Mediterranean diet increase HDL.',
    },
  ],

  'LDL Cholesterol': [
    {
      name: 'LDL Cholesterol (Bad Cholesterol)',
      abbreviation: 'LDL',
      description:
        'Low-density lipoprotein - builds up in arteries and causes disease',
      whatItMeasures:
        'Harmful cholesterol that accumulates in artery walls, leading to atherosclerosis',
      normalRange: '<100 mg/dL (optimal)',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'High (>130): Increased heart disease risk',
        'Very high (>160): Significantly increased risk, needs medication',
      ],
      clinicalSignificance:
        'LDL cholesterol is primary target for heart disease prevention. Lower levels reduce cardiovascular events. Target varies by risk.',
    },
  ],

  'Triglycerides': [
    {
      name: 'Triglycerides',
      abbreviation: 'TG',
      description: 'Type of fat in your blood that provides energy',
      whatItMeasures:
        'Level of triglycerides (storage form of fat) in bloodstream',
      normalRange: '<150 mg/dL (normal)',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Borderline high (150-199): Increased risk',
        'High (200-499): Increased risk, especially with low HDL',
        'Very high (≥500): Risk of pancreatitis, needs treatment',
      ],
      clinicalSignificance:
        'High triglycerides combined with low HDL indicates metabolic syndrome. Diet, exercise, and medication can lower levels.',
    },
  ],

  'VLDL Cholesterol': [
    {
      name: 'VLDL Cholesterol',
      abbreviation: 'VLDL',
      description:
        'Very low-density lipoprotein - carries triglycerides in blood',
      whatItMeasures:
        'Calculated from triglycerides (VLDL = Triglycerides/5 or direct measurement)',
      normalRange: '<30 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Associated with high triglycerides, metabolic issues',
      ],
      clinicalSignificance:
        'High VLDL indicates excess triglyceride particles. Should be lowered along with triglyceride reduction.',
    },
  ],

  'Cholesterol Ratio': [
    {
      name: 'Total Cholesterol to HDL Ratio',
      abbreviation: 'TC/HDL',
      description:
        'Ratio of total cholesterol to good cholesterol (risk predictor)',
      whatItMeasures:
        'Balance between harmful and protective cholesterol (total cholesterol divided by HDL)',
      normalRange: '<5.0 (optimal)',
      unit: 'Ratio (no units)',
      abnormalIndicates: [
        '5-9: Borderline, monitor',
        '>9: High risk for heart disease',
      ],
      clinicalSignificance:
        'This ratio is better predictor of heart disease risk than total cholesterol alone. Better than individual values for risk assessment.',
    },
  ],

  'White Blood Cell Count': [
    {
      name: 'White Blood Cell (WBC) Count',
      abbreviation: 'WBC',
      description: 'Number of infection-fighting cells in your blood',
      whatItMeasures:
        'Total count of white blood cells (immune system cells) per microliter',
      normalRange: '4,500-11,000 cells/μL',
      unit: 'cells per microliter (cells/μL)',
      abnormalIndicates: [
        'High (>11,000): Infection, inflammation, leukemia, stress',
        'Low (<4,500): Immunosuppression, bone marrow disease, autoimmune',
      ],
      clinicalSignificance:
        'WBC count indicates immune system activity. Elevated levels suggest infection or inflammation. Low levels indicate immune compromise.',
    },
  ],

  'Red Blood Cell Count': [
    {
      name: 'Red Blood Cell (RBC) Count',
      abbreviation: 'RBC',
      description: 'Number of oxygen-carrying cells in your blood',
      whatItMeasures:
        'Total count of red blood cells (erythrocytes) per microliter',
      normalRange: '4.5-5.5 million cells/μL (men), 4.1-5.1 million (women)',
      unit: 'million cells per microliter (million/μL)',
      abnormalIndicates: [
        'High (Polycythemia): Dehydration, chronic hypoxia, disease',
        'Low (Anemia): Iron deficiency, B12 deficiency, bleeding, bone marrow disease',
      ],
      clinicalSignificance:
        'RBC count determines oxygen-carrying capacity. Low RBC causes fatigue and weakness. High RBC increases blood viscosity.',
    },
  ],

  'Hemoglobin': [
    {
      name: 'Hemoglobin',
      abbreviation: 'Hgb',
      description: 'Protein in red blood cells that carries oxygen',
      whatItMeasures:
        'Concentration of hemoglobin (oxygen-carrying protein) in blood',
      normalRange: '13.5-17.5 g/dL (men), 12-15.5 g/dL (women)',
      unit: 'grams per deciliter (g/dL)',
      abnormalIndicates: [
        'Low: Anemia (various causes), fatigue, weakness',
        'High: Dehydration, polycythemia, chronic lung disease',
      ],
      clinicalSignificance:
        'Hemoglobin is best indicator of anemia. Low levels significantly impact oxygen delivery and energy levels.',
    },
  ],

  'Hematocrit': [
    {
      name: 'Hematocrit',
      abbreviation: 'Hct',
      description: 'Percentage of blood volume made up of red blood cells',
      whatItMeasures:
        'Proportion of blood volume occupied by red blood cells (percentage)',
      normalRange: '41-50% (men), 36-44% (women)',
      unit: 'Percentage (%)',
      abnormalIndicates: [
        'Low: Anemia, bleeding, bone marrow disease, nutritional deficiency',
        'High: Dehydration, polycythemia, chronic hypoxia',
      ],
      clinicalSignificance:
        'Hematocrit parallels hemoglobin. Low hematocrit indicates insufficient red blood cells. High indicates blood is too thick.',
    },
  ],

  'Platelets': [
    {
      name: 'Platelet Count',
      abbreviation: 'Plt',
      description: 'Number of clotting cells in your blood',
      whatItMeasures:
        'Count of platelets (thrombocytes) that help blood clot per microliter',
      normalRange: '150,000-400,000 cells/μL',
      unit: 'cells per microliter (cells/μL)',
      abnormalIndicates: [
        'High (Thrombocytosis): Inflammation, cancer, essential thrombocythemia',
        'Low (Thrombocytopenia): Bleeding risk, bone marrow disease, ITP',
      ],
      clinicalSignificance:
        'Platelets are essential for clotting. Too few causes bleeding problems. Too many increases clot risk.',
    },
  ],

  'Mean Corpuscular Volume': [
    {
      name: 'Mean Corpuscular Volume (MCV)',
      abbreviation: 'MCV',
      description: 'Average size of your red blood cells',
      whatItMeasures:
        'Mean volume of individual red blood cells (determines microcytic, normocytic, macrocytic)',
      normalRange: '80-100 fL (femtoliters)',
      unit: 'femtoliters (fL)',
      abnormalIndicates: [
        'Low (<80): Microcytic anemia (iron deficiency, thalassemia)',
        'High (>100): Macrocytic anemia (B12/folate deficiency, liver disease)',
      ],
      clinicalSignificance:
        'MCV helps classify type of anemia. Guides treatment based on underlying cause.',
    },
  ],

  'Mean Corpuscular Hemoglobin': [
    {
      name: 'Mean Corpuscular Hemoglobin (MCH)',
      abbreviation: 'MCH',
      description: 'Average amount of hemoglobin in each red blood cell',
      whatItMeasures:
        'Mean weight of hemoglobin in individual red blood cells',
      normalRange: '27-33 pg (picograms)',
      unit: 'picograms (pg)',
      abnormalIndicates: [
        'Low: Hypochromic anemia (iron deficiency)',
        'High: Macrocytic conditions',
      ],
      clinicalSignificance:
        'MCH helps determine if anemia is due to insufficient hemoglobin per cell.',
    },
  ],

  'Red Cell Distribution Width': [
    {
      name: 'Red Cell Distribution Width (RDW)',
      abbreviation: 'RDW',
      description: 'Variation in size of your red blood cells',
      whatItMeasures:
        'Degree of variation in red blood cell volume (size distribution)',
      normalRange: '11-15%',
      unit: 'Percentage (%)',
      abnormalIndicates: [
        'Elevated (>15%): Indicates anisocytosis (unequal RBC sizes), suggests mixed anemia or nutritional deficiency',
        'Very elevated: May indicate serious underlying disease',
      ],
      clinicalSignificance:
        'High RDW often combined with low MCV indicates iron deficiency anemia. Helps characterize types of anemia.',
    },
  ],

  'TSH': [
    {
      name: 'Thyroid-Stimulating Hormone',
      abbreviation: 'TSH',
      description:
        'Hormone from brain that controls thyroid gland activity',
      whatItMeasures:
        'Level of TSH that signals thyroid to produce thyroid hormones',
      normalRange: '0.4-4.0 mIU/L',
      unit: 'milliunits per liter (mIU/L)',
      abnormalIndicates: [
        'High (>4.0): Hypothyroidism (underactive thyroid), iodine deficiency',
        'Low (<0.4): Hyperthyroidism (overactive thyroid), thyroiditis',
      ],
      clinicalSignificance:
        'TSH is best screening test for thyroid disease. Determines need for thyroid hormone replacement or anti-thyroid therapy.',
    },
  ],

  'Free T3': [
    {
      name: 'Free Triiodothyronine',
      abbreviation: 'Free T3',
      description: 'Active thyroid hormone that controls metabolism',
      whatItMeasures:
        'Level of unbound, biologically active T3 thyroid hormone',
      normalRange: '2.3-4.2 pg/mL',
      unit: 'picograms per milliliter (pg/mL)',
      abnormalIndicates: [
        'High: Hyperthyroidism, thyroid cancer, thyroiditis',
        'Low: Hypothyroidism, malnutrition, illness',
      ],
      clinicalSignificance:
        'Free T3 is most potent thyroid hormone. Better reflects thyroid status than total T3.',
    },
  ],

  'Free T4': [
    {
      name: 'Free Thyroxine',
      abbreviation: 'Free T4',
      description: 'Main thyroid hormone that controls energy and metabolism',
      whatItMeasures: 'Level of unbound, active T4 thyroid hormone',
      normalRange: '0.8-1.8 ng/dL',
      unit: 'nanograms per deciliter (ng/dL)',
      abnormalIndicates: [
        'High: Hyperthyroidism, thyroiditis, thyroid cancer',
        'Low: Hypothyroidism, needs thyroxine replacement',
      ],
      clinicalSignificance:
        'Free T4 determines overall thyroid hormone effect on body. Low levels cause fatigue, weight gain. High causes weight loss, anxiety.',
    },
  ],

  'Total T3': [
    {
      name: 'Total Triiodothyronine',
      abbreviation: 'Total T3',
      description: 'Total amount of T3 hormone in blood (bound and free)',
      whatItMeasures:
        'Sum of T3 bound to proteins and free (active) T3 hormone',
      normalRange: '80-200 ng/dL',
      unit: 'nanograms per deciliter (ng/dL)',
      abnormalIndicates: [
        'High: Hyperthyroidism, thyroiditis, excess iodine',
        'Low: Hypothyroidism, severe illness, malnutrition',
      ],
      clinicalSignificance:
        'Less specific than free T3. Affected by protein levels. Free T3 preferred for diagnosis.',
    },
  ],

  'Total T4': [
    {
      name: 'Total Thyroxine',
      abbreviation: 'Total T4',
      description: 'Total amount of T4 hormone in blood (bound and free)',
      whatItMeasures: 'Sum of T4 bound to proteins and free (active) T4',
      normalRange: '5-12 μg/dL',
      unit: 'micrograms per deciliter (μg/dL)',
      abnormalIndicates: [
        'High: Hyperthyroidism, thyroiditis, pregnancy',
        'Low: Hypothyroidism, protein malnutrition',
      ],
      clinicalSignificance:
        'Affected by protein levels. Free T4 is more reliable. Combined TSH+Free T4 is standard thyroid screening.',
    },
  ],

  'TPO Antibodies': [
    {
      name: 'Thyroid Peroxidase Antibodies',
      abbreviation: 'Anti-TPO',
      description:
        'Antibodies that attack thyroid peroxidase enzyme (autoimmune)',
      whatItMeasures:
        'Presence of antibodies against thyroid peroxidase (indicates autoimmune thyroid disease)',
      normalRange: '<35 IU/mL',
      unit: 'international units per milliliter (IU/mL)',
      abnormalIndicates: [
        'Positive: Hashimoto thyroiditis, autoimmune thyroid disease, Graves disease',
      ],
      clinicalSignificance:
        'Indicates autoimmune thyroid disease. Predicts progression to hypothyroidism.',
    },
  ],

  'Thyroglobulin Antibodies': [
    {
      name: 'Thyroglobulin Antibodies',
      abbreviation: 'Anti-Tg',
      description: 'Antibodies that attack thyroglobulin protein (autoimmune)',
      whatItMeasures:
        'Presence of antibodies against thyroglobulin (indicates autoimmune thyroid disease)',
      normalRange: '<1 IU/mL',
      unit: 'international units per milliliter (IU/mL)',
      abnormalIndicates: [
        'Positive: Hashimoto thyroiditis, Graves disease, thyroid cancer',
      ],
      clinicalSignificance:
        'Found in autoimmune thyroid disease. Used to monitor thyroid cancer treatment.',
    },
  ],

  'Creatinine': [
    {
      name: 'Serum Creatinine',
      abbreviation: 'Creatinine',
      description: 'Waste product from muscle metabolism excreted by kidneys',
      whatItMeasures:
        'Concentration of creatinine in blood (marker of kidney filtration)',
      normalRange: '0.7-1.3 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Kidney disease, muscle disease, dehydration',
        'Very high: Severe kidney dysfunction, kidney failure',
      ],
      clinicalSignificance:
        'Creatinine is reliable indicator of kidney function. Combined with BUN for kidney assessment.',
    },
  ],

  'BUN': [
    {
      name: 'Blood Urea Nitrogen',
      abbreviation: 'BUN',
      description: 'Waste product from protein metabolism in the liver',
      whatItMeasures:
        'Concentration of urea nitrogen (protein breakdown product) in blood',
      normalRange: '7-20 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'High: Kidney disease, dehydration, high protein diet, liver disease',
        'Low: Liver disease, malnutrition, pregnancy',
      ],
      clinicalSignificance:
        'Affected by kidney function, hydration, and protein intake. Must be interpreted with creatinine.',
    },
  ],

  'GFR': [
    {
      name: 'Glomerular Filtration Rate',
      abbreviation: 'GFR',
      description:
        'Measurement of how well kidneys filter waste from blood',
      whatItMeasures:
        'Estimated volume of blood filtered per minute by kidneys (calculated from creatinine)',
      normalRange: '>60 mL/min/1.73m² (normal)',
      unit: 'milliliters per minute per 1.73 square meters (mL/min/1.73m²)',
      abnormalIndicates: [
        '45-59: Mild kidney disease (Stage 2)',
        '30-44: Moderate kidney disease (Stage 3a)',
        '15-29: Severe kidney disease (Stage 3b/4)',
        '<15: Kidney failure (Stage 5), needs dialysis',
      ],
      clinicalSignificance:
        'GFR is best indicator of overall kidney function. Determines kidney disease stage and treatment.',
    },
  ],

  'BUN/Creatinine Ratio': [
    {
      name: 'BUN to Creatinine Ratio',
      abbreviation: 'BUN/Cr',
      description: 'Ratio distinguishes causes of kidney function problems',
      whatItMeasures:
        'Balance between urea and creatinine (helps identify cause of kidney problems)',
      normalRange: '10-20',
      unit: 'Ratio (no units)',
      abnormalIndicates: [
        'High ratio (>20): Pre-renal problems (dehydration, shock, reduced kidney blood flow)',
        'Normal ratio with high BUN/Cr: Intrinsic kidney disease',
      ],
      clinicalSignificance:
        'Helps determine if kidney problem is from reduced blood flow or actual kidney damage.',
    },
  ],

  'Uric Acid': [
    {
      name: 'Serum Uric Acid',
      abbreviation: 'Uric Acid',
      description:
        'Waste product from purine metabolism (related to gout risk)',
      whatItMeasures:
        'Concentration of uric acid in blood (end product of purine metabolism)',
      normalRange: '3.5-7.2 mg/dL (men), 2.6-6.0 mg/dL (women)',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Gout risk, kidney stones, hyperuricemia, diet high in purines',
        'Very high: Tumor lysis syndrome risk',
      ],
      clinicalSignificance:
        'High uric acid predisposes to gout and kidney stones. Requires dietary changes and sometimes medication.',
    },
  ],

  'AST': [
    {
      name: 'Aspartate Aminotransferase',
      abbreviation: 'AST',
      description: 'Liver enzyme found also in heart and muscle',
      whatItMeasures:
        'Concentration of AST enzyme (elevated when liver, heart, or muscle damaged)',
      normalRange: '10-40 U/L',
      unit: 'units per liter (U/L)',
      abnormalIndicates: [
        'Elevated: Liver disease, hepatitis, cirrhosis, heart attack, muscle damage',
      ],
      clinicalSignificance:
        'AST released when liver or muscle cells damaged. Less specific than ALT for liver disease.',
    },
  ],

  'ALT': [
    {
      name: 'Alanine Aminotransferase',
      abbreviation: 'ALT',
      description: 'Liver enzyme more specific to liver damage',
      whatItMeasures:
        'Concentration of ALT enzyme (elevated when liver cells damaged)',
      normalRange: '7-56 U/L',
      unit: 'units per liter (U/L)',
      abnormalIndicates: [
        'Elevated: Liver disease, hepatitis, cirrhosis, fatty liver, medications',
      ],
      clinicalSignificance:
        'ALT more specific for liver than AST. Best indicator of liver cell damage. Important in viral hepatitis monitoring.',
    },
  ],

  'ALP': [
    {
      name: 'Alkaline Phosphatase',
      abbreviation: 'ALP',
      description: 'Enzyme found in liver and bones',
      whatItMeasures:
        'Concentration of ALP enzyme (elevated in liver disease or bone turnover)',
      normalRange: '30-120 U/L',
      unit: 'units per liter (U/L)',
      abnormalIndicates: [
        'Elevated: Cholestasis, bone disease, growing children, pregnancy',
      ],
      clinicalSignificance:
        'Helps identify type of liver disease. Fractionation (hepatic vs bone) helps determine source.',
    },
  ],

  'Total Bilirubin': [
    {
      name: 'Total Bilirubin',
      abbreviation: 'T. Bil',
      description: 'Breakdown product of hemoglobin (yellow pigment)',
      whatItMeasures:
        'Total concentration of bilirubin (direct + indirect, product of RBC breakdown)',
      normalRange: '0.1-1.2 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Jaundice, liver disease, hemolysis, biliary obstruction',
      ],
      clinicalSignificance:
        'Elevated bilirubin causes yellowing of skin and eyes (jaundice). Indicates liver disease or RBC breakdown.',
    },
  ],

  'Direct Bilirubin': [
    {
      name: 'Direct (Conjugated) Bilirubin',
      abbreviation: 'D. Bil',
      description:
        'Bilirubin that has been processed by liver and excreted',
      whatItMeasures:
        'Concentration of bilirubin conjugated in liver (indicates liver processing)',
      normalRange: '0.0-0.3 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Cholestasis, cirrhosis, hepatitis, biliary obstruction',
      ],
      clinicalSignificance:
        'Elevated direct bilirubin indicates liver has processed it but cannot excrete. Suggests cholestasis.',
    },
  ],

  'Indirect Bilirubin': [
    {
      name: 'Indirect (Unconjugated) Bilirubin',
      abbreviation: 'I. Bil',
      description: 'Bilirubin not yet processed by liver',
      whatItMeasures:
        'Concentration of bilirubin not yet conjugated in liver (calculated)',
      normalRange: '0.1-0.9 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Elevated: Hemolysis (RBC breakdown), immature liver (newborns), liver dysfunction',
      ],
      clinicalSignificance:
        'High indirect bilirubin suggests RBC breakdown or liver cannot process bilirubin.',
    },
  ],

  'Albumin': [
    {
      name: 'Serum Albumin',
      abbreviation: 'Albumin',
      description: 'Main protein produced by liver',
      whatItMeasures:
        'Concentration of albumin (largest component of blood protein)',
      normalRange: '3.5-5.0 g/dL',
      unit: 'grams per deciliter (g/dL)',
      abnormalIndicates: [
        'Low: Liver disease, malnutrition, kidney disease, inflammation',
      ],
      clinicalSignificance:
        'Albumin reflects liver synthetic function and nutritional status. Low albumin indicates serious illness.',
    },
  ],

  'Total Protein': [
    {
      name: 'Total Serum Protein',
      abbreviation: 'T. Protein',
      description: 'All proteins in blood (albumin and globulins)',
      whatItMeasures:
        'Total concentration of all proteins in blood (albumin + globulins)',
      normalRange: '6.0-8.3 g/dL',
      unit: 'grams per deciliter (g/dL)',
      abnormalIndicates: [
        'Low: Malnutrition, liver disease, kidney disease, bleeding',
        'High: Dehydration, multiple myeloma, chronic infections',
      ],
      clinicalSignificance:
        'Total protein reflects nutritional status and synthetic function. Abnormal requires protein electrophoresis.',
    },
  ],

  'Sodium': [
    {
      name: 'Serum Sodium',
      abbreviation: 'Na+',
      description: 'Electrolyte that controls fluid balance',
      whatItMeasures:
        'Concentration of sodium ion (major electrolyte controlling fluid and blood pressure)',
      normalRange: '136-145 mEq/L',
      unit: 'milliequivalents per liter (mEq/L)',
      abnormalIndicates: [
        'High (>145): Hypernatremia, dehydration, excessive salt intake',
        'Low (<136): Hyponatremia, water intoxication, SIADH, diuretics',
      ],
      clinicalSignificance:
        'Sodium imbalance causes neurologic symptoms (confusion, seizures). Critical for brain function.',
    },
  ],

  'Potassium': [
    {
      name: 'Serum Potassium',
      abbreviation: 'K+',
      description: 'Electrolyte critical for heart rhythm and muscle',
      whatItMeasures:
        'Concentration of potassium ion (essential for heart and muscle function)',
      normalRange: '3.5-5.0 mEq/L',
      unit: 'milliequivalents per liter (mEq/L)',
      abnormalIndicates: [
        'High (>5.0): Hyperkalemia, kidney disease, muscle breakdown, medications',
        'Low (<3.5): Hypokalemia, vomiting, diarrhea, diuretics, causes weakness, arrhythmias',
      ],
      clinicalSignificance:
        'Critical for heart rhythm. Even small changes can cause dangerous arrhythmias. Must be monitored carefully.',
    },
  ],

  'Chloride': [
    {
      name: 'Serum Chloride',
      abbreviation: 'Cl-',
      description: 'Electrolyte that works with sodium for fluid balance',
      whatItMeasures:
        'Concentration of chloride ion (major anion with sodium in plasma)',
      normalRange: '98-107 mEq/L',
      unit: 'milliequivalents per liter (mEq/L)',
      abnormalIndicates: [
        'Elevated: Dehydration, hyperchloremic acidosis',
        'Low: Metabolic alkalosis, vomiting, diuretics',
      ],
      clinicalSignificance:
        'Chloride parallels sodium. Used to calculate anion gap. Important in acid-base balance.',
    },
  ],

  'Bicarbonate': [
    {
      name: 'Serum Bicarbonate',
      abbreviation: 'HCO3-',
      description: 'Buffer that maintains blood pH',
      whatItMeasures:
        'Concentration of bicarbonate ion (major buffer maintaining blood pH)',
      normalRange: '23-29 mEq/L',
      unit: 'milliequivalents per liter (mEq/L)',
      abnormalIndicates: [
        'Elevated: Metabolic alkalosis, respiratory acidosis compensation',
        'Low: Metabolic acidosis, respiratory alkalosis compensation',
      ],
      clinicalSignificance:
        'Key component of acid-base balance. Abnormal levels indicate metabolic or respiratory problems.',
    },
  ],

  'Anion Gap': [
    {
      name: 'Anion Gap',
      abbreviation: 'AG',
      description: 'Difference between major cations and anions',
      whatItMeasures:
        'Calculated difference: (Na+ + K+) - (Cl- + HCO3-) = normal 8-16 mEq/L',
      normalRange: '8-16 mEq/L',
      unit: 'milliequivalents per liter (mEq/L)',
      abnormalIndicates: [
        'High (>16): High anion gap metabolic acidosis (lactic acidosis, ketoacidosis, toxins)',
        'Low (<8): Low anion gap metabolic acidosis, lab error',
      ],
      clinicalSignificance:
        'Helps identify cause of metabolic acidosis. Essential for interpreting acid-base disorders.',
    },
  ],

  'SpO2': [
    {
      name: 'Oxygen Saturation',
      abbreviation: 'SpO2',
      description: 'Percentage of hemoglobin carrying oxygen',
      whatItMeasures:
        'Percentage of hemoglobin bound to oxygen (measured by pulse oximetry)',
      normalRange: '95-100%',
      unit: 'Percentage (%)',
      abnormalIndicates: [
        'Low (90-95%): Mild hypoxemia, monitor',
        'Very low (<90%): Hypoxemia, requires oxygen supplementation',
      ],
      clinicalSignificance:
        'SpO2 indicates how well lungs oxygenate blood. Critical for brain and heart function.',
    },
  ],

  'CRP': [
    {
      name: 'C-Reactive Protein',
      abbreviation: 'CRP',
      description: 'Protein indicating inflammation or infection',
      whatItMeasures:
        'Concentration of CRP (acute phase reactant produced during inflammation)',
      normalRange: '<3 mg/L (or <0.3 mg/dL)',
      unit: 'milligrams per liter (mg/L)',
      abnormalIndicates: [
        'Elevated: Inflammation, infection, autoimmune disease, cardiovascular disease risk',
      ],
      clinicalSignificance:
        'CRP indicates inflammation. Elevated CRP is independent cardiovascular risk factor.',
    },
  ],

  'High-Sensitivity CRP': [
    {
      name: 'High-Sensitivity C-Reactive Protein',
      abbreviation: 'hs-CRP',
      description: 'More sensitive CRP test detecting lower inflammation levels',
      whatItMeasures:
        'Concentration of CRP at lower limits (detects inflammation earlier)',
      normalRange: '<1.0 mg/L',
      unit: 'milligrams per liter (mg/L)',
      abnormalIndicates: [
        'Elevated: Inflammation, increased cardiovascular risk, infection',
      ],
      clinicalSignificance:
        'hs-CRP better detects chronic inflammation. Used for cardiovascular risk assessment.',
    },
  ],

  'CRP Status': [
    {
      name: 'CRP Inflammatory Status',
      abbreviation: 'CRP Status',
      description: 'Interpretation of CRP level for risk assessment',
      whatItMeasures:
        'Classification of inflammation level (low, moderate, high risk)',
      normalRange: 'Low risk',
      unit: 'Qualitative (Low/Moderate/High)',
      abnormalIndicates: [
        'High risk: CRP >3 mg/L, increased cardiovascular and infection risk',
      ],
      clinicalSignificance:
        'Helps stratify cardiovascular risk. Used in preventive medicine strategies.',
    },
  ],

  'Magnesium': [
    {
      name: 'Serum Magnesium',
      abbreviation: 'Mg',
      description: 'Electrolyte important for muscle and nerve function',
      whatItMeasures:
        'Concentration of magnesium ion (cofactor for 300+ enzymes)',
      normalRange: '1.7-2.2 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Low: Muscle cramps, arrhythmias, weakness, malabsorption',
        'High: Kidney failure, can cause weakness and cardiac problems',
      ],
      clinicalSignificance:
        'Magnesium deficiency common and often missed. Important for muscle and cardiac function.',
    },
  ],

  'Calcium': [
    {
      name: 'Total Serum Calcium',
      abbreviation: 'Ca',
      description: 'Mineral important for bones, nerves, and muscle',
      whatItMeasures:
        'Total concentration of calcium (bound and free calcium)',
      normalRange: '8.5-10.2 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'High (Hypercalcemia): Cancer, hyperparathyroidism, vitamin D toxicity',
        'Low (Hypocalcemia): Hypoparathyroidism, vitamin D deficiency, kidney disease',
      ],
      clinicalSignificance:
        'Calcium imbalance causes muscle cramps, arrhythmias, and bone problems.',
    },
  ],

  'Ionized Calcium': [
    {
      name: 'Ionized (Free) Calcium',
      abbreviation: 'iCa',
      description: 'Biologically active form of calcium',
      whatItMeasures:
        'Concentration of free calcium not bound to proteins (active form)',
      normalRange: '4.5-5.3 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'Abnormal: More accurate than total calcium in critical illness',
      ],
      clinicalSignificance:
        'Ionized calcium better reflects true calcium status than total calcium.',
    },
  ],

  'Phosphate': [
    {
      name: 'Serum Phosphate',
      abbreviation: 'Phos',
      description: 'Mineral important for bones and energy metabolism',
      whatItMeasures:
        'Concentration of inorganic phosphate (paired with calcium for bone formation)',
      normalRange: '2.5-4.5 mg/dL',
      unit: 'milligrams per deciliter (mg/dL)',
      abnormalIndicates: [
        'High: Kidney disease, hypoparathyroidism',
        'Low: Hypophosphatemia, malnutrition, diabetes complications',
      ],
      clinicalSignificance:
        'Phosphate and calcium work together for bone health. Imbalance indicates kidney disease.',
    },
  ],

  'Calcium-Phosphate Ratio': [
    {
      name: 'Calcium to Phosphate Ratio',
      abbreviation: 'Ca/Phos',
      description: 'Balance of minerals for bone health',
      whatItMeasures: 'Ratio indicating calcium-phosphate balance',
      normalRange: '~2.0-2.5',
      unit: 'Ratio (no units)',
      abnormalIndicates: [
        'Abnormal ratio: Indicates bone or mineral metabolism disorders',
      ],
      clinicalSignificance:
        'Helps assess bone mineral status and kidney function.',
    },
  ],
};

/**
 * Get parameter information for a specific test
 */
export function getTestParameters(testName: string): ParameterInfo[] {
  return TEST_PARAMETERS[testName] || [];
}

/**
 * Get parameter information by parameter name
 */
export function getParameterInfo(parameterName: string): ParameterInfo | undefined {
  for (const params of Object.values(TEST_PARAMETERS)) {
    const param = params.find((p) => p.name === parameterName || p.abbreviation === parameterName);
    if (param) return param;
  }
  return undefined;
}

export default TEST_PARAMETERS;
