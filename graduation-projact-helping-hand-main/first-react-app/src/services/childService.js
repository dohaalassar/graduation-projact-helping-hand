import API from './api';

// جيبي كل أبناء الوالد
export async function getMyChildren() {
  const response = await API.get('/children');
  return response.data.children;
}

// أضيفي طفل جديد
export async function addChild(childData) {
  const response = await API.post('/children', childData);
  return response.data.child;
}

// جيبي تقييمات طفل معين
export async function getChildAssessments(childId) {
  const response = await API.get(`/assessments/${childId}`);
  return response.data.assessments;
}

// جيبي أسئلة الـ SDQ من الباكند
export async function getSDQQuestions() {
  const response = await API.get('/sdq/questions');
  return response.data.questions;
}

// أرسلي إجابات الـ SDQ للباكند
export async function submitSDQ(childId, answers) {
  const response = await API.post(`/sdq/${childId}`, { answers });
  return response.data;
}

// إنشاء assessment جديد
export async function createAssessment(childId) {
  const response = await API.post(`/assessments/${childId}`);
  return response.data.assessment;
}

// إرسال نتيجة لعبة
export async function submitGameResult(assessmentId, gameNumber, actions, durationSeconds) {
  const response = await API.post(
    `/assessments/${assessmentId}/games/${gameNumber}`,
    { actions, durationSeconds }
  );
  return response.data;
}

// إنهاء الـ assessment
export async function finalizeAssessment(assessmentId) {
  const response = await API.post(`/assessments/${assessmentId}/finalize`);
  return response.data;
}