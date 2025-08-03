import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../auth/services/user-storage.service';

const BASIC_URL = "http://localhost:8082/api/test";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // Create a new test
  createTest(testDto): Observable<any> {
    return this.http.post(`${BASIC_URL}/create`, testDto);
  }

  // Get all tests
  getAllTest(): Observable<any> {
    return this.http.get(`${BASIC_URL}`);
  }

  // Add question to a test
  addQuestionTest(questionDto): Observable<any> {
    return this.http.post(`${BASIC_URL}/addQuestion`, questionDto);
  }

  // Get all questions for a specific test
  getTestQuestions(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/questions/${id}`);
  }

  // Get test results for the current user
  getMyTestResults(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(`${BASIC_URL}/results/${userId}`);
  }

  // Delete a test
  deleteTest(testId: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/${testId}`);
  }

  // Publish or unpublish a test
  updatePublishStatus(testId: number, published: boolean): Observable<any> {
    return this.http.patch(`${BASIC_URL}/toggle-publish/${testId}`, { published });
  }

  updateQuestion(question: any) {
    return this.http.put(`http://localhost:8082/api/test/questions/${question.id}`, question);
  }
  
  getDetailedResult(userId: number, testId: number) {
    return this.http.get<any[]>(`/api/user/${userId}/test/${testId}/detailed-results`);
  }
  
}
