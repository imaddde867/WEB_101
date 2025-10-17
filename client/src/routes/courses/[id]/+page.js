import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ params, fetch }) {
  const courseId = params.id;
  
  try {
    const courseResponse = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}`);
    const questionsResponse = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`);
    
    if (courseResponse.ok && questionsResponse.ok) {
      const course = await courseResponse.json();
      const questions = await questionsResponse.json();
      
      return {
        course,
        questions,
        courseId
      };
    }
  } catch (error) {
    console.error("Error loading course data:", error);
  }
  
  return {
    course: null,
    questions: [],
    courseId
  };
}
