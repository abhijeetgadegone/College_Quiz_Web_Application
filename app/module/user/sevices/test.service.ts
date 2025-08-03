import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../auth/services/user-storage.service';

const BASIC_URL = "http://localhost:8082/api/test";

@Injectable
({
  providedIn: 'root'
})


export class TestService {
  constructor(private http: HttpClient) {}

  // Get all tests (admin view)
  getAllTests(): Observable<any> {
    return this.http.get(`${BASIC_URL}`);
  }

  // Get published tests (for users)
  getAllPublishedTests(): Observable<any> {
    return this.http.get(`${BASIC_URL}/published`);
  }

  // Get test questions by test ID
  getTestQuestions(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/questions/${id}`);
  }

   
   submitTest(data: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/submitTest`, data); 
  }

  
  getAllTestResults(): Observable<any> {
    return this.http.get(`${BASIC_URL}/results`);
  }

  // Get all test results for current user
  getMyTestResults(): Observable<any> {
    const userId = UserStorageService.getUserId(); 
    return this.http.get(`${BASIC_URL}/results/${userId}`);
  }
  
  

  
  toggleTestPublish(testId: number, published: boolean): Observable<any> {
    return this.http.patch(`${BASIC_URL}/toggle-publish/${testId}`, { published });
  }

 getDetailedTestResult(userId: number, testId: number): Observable<any> {
  return this.http.get(`${BASIC_URL}/result/detailed/${userId}/${testId}`);
}


  
}
