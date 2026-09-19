import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { StudentLayout } from '@/layouts/StudentLayout';
import { TeacherLayout } from '@/layouts/TeacherLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/layouts/ProtectedRoute';

// Auth Features
import { Login } from '@/features/auth/Login';
import { Register } from '@/features/auth/Register';

// Student Features
import { StudentHome } from '@/features/student/Home';
import { Learn } from '@/features/student/Learn';
import { SubjectJourney } from '@/features/student/SubjectJourney';
import { ChapterOverview } from '@/features/student/ChapterOverview';
import { LessonView } from '@/features/student/LessonView';
import { LessonCompletion } from '@/features/student/LessonCompletion';
import { PracticeView } from '@/features/student/PracticeView';
import { DailyChallenge } from '@/features/student/DailyChallenge';
import { AiMentor } from '@/features/student/AiMentor';
import { VoiceAi } from '@/features/student/VoiceAi';
import { CameraScan } from '@/features/student/CameraScan';
import { MasteryMap } from '@/features/student/MasteryMap';
import { NextBestActionView } from '@/features/student/NextBestAction';
import { TasksList } from '@/features/student/TasksList';
import { TaskDetail } from '@/features/student/TaskDetail';
import { TestStart } from '@/features/student/TestStart';
import { TestInterface } from '@/features/student/TestInterface';
import { TestResult } from '@/features/student/TestResult';
import { StudentProfile } from '@/features/student/Profile';
import { AchievementsView } from '@/features/student/Achievements';
import { NotificationsView } from '@/features/student/Notifications';

// Teacher Features
import { TeacherDashboard } from '@/features/teacher/TeacherDashboard';
import { ClassesList } from '@/features/teacher/ClassesList';
import { ClassDetail } from '@/features/teacher/ClassDetail';
import { StudentsList } from '@/features/teacher/StudentsList';
import { TeacherStudentProfile } from '@/features/teacher/TeacherStudentProfile';
import { AssignmentsList } from '@/features/teacher/AssignmentsList';
import { CreateAssignment } from '@/features/teacher/CreateAssignment';
import { HomeworkList } from '@/features/teacher/HomeworkList';
import { TestsList } from '@/features/teacher/TestsList';
import { CreateTest } from '@/features/teacher/CreateTest';
import { AttendanceView } from '@/features/teacher/AttendanceView';
import { SubmissionsList } from '@/features/teacher/SubmissionsList';
import { EvaluationView } from '@/features/teacher/EvaluationView';
import { AnalyticsView } from '@/features/teacher/AnalyticsView';
import { ClassIntelligence } from '@/features/teacher/ClassIntelligence';
import { InterventionsView } from '@/features/teacher/InterventionsView';
import { MaterialsView } from '@/features/teacher/MaterialsView';
import { TeacherSettings } from '@/features/teacher/TeacherSettings';

// Admin Features
import { AdminDashboard } from '@/features/admin/AdminDashboard';
import { AdminStudents } from '@/features/admin/AdminStudents';
import { AdminTeachers } from '@/features/admin/AdminTeachers';
import { AdminClasses } from '@/features/admin/AdminClasses';
import { AdminSubjects } from '@/features/admin/AdminSubjects';
import { AdminAcademicYear } from '@/features/admin/AdminAcademicYear';
import { AdminReports } from '@/features/admin/AdminReports';
import { AdminSettings } from '@/features/admin/AdminSettings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/student/home" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student App Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="/student/home" replace />} />
        <Route path="home" element={<StudentHome />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:subjectId" element={<SubjectJourney />} />
        <Route path="learn/:subjectId/:chapterId" element={<ChapterOverview />} />
        <Route path="lesson/:lessonId" element={<LessonView />} />
        <Route path="lesson/:lessonId/complete" element={<LessonCompletion />} />
        <Route path="practice" element={<PracticeView />} />
        <Route path="practice/challenge" element={<DailyChallenge />} />
        <Route path="practice/:practiceId" element={<PracticeView />} />
        <Route path="test/:testId" element={<TestStart />} />
        <Route path="test/:testId/active" element={<TestInterface />} />
        <Route path="result/:attemptId" element={<TestResult />} />
        <Route path="ai" element={<AiMentor />} />
        <Route path="ai/chat" element={<AiMentor />} />
        <Route path="ai/scan" element={<CameraScan />} />
        <Route path="ai/voice" element={<VoiceAi />} />
        <Route path="mastery" element={<MasteryMap />} />
        <Route path="mastery/:subjectId" element={<MasteryMap />} />
        <Route path="next-best-action" element={<NextBestActionView />} />
        <Route path="tasks" element={<TasksList />} />
        <Route path="tasks/:taskId" element={<TaskDetail />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="achievements" element={<AchievementsView />} />
        <Route path="notifications" element={<NotificationsView />} />
      </Route>

      {/* Teacher Portal Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="classes" element={<ClassesList />} />
        <Route path="classes/:classId" element={<ClassDetail />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:studentId" element={<TeacherStudentProfile />} />
        <Route path="assignments" element={<AssignmentsList />} />
        <Route path="assignments/new" element={<CreateAssignment />} />
        <Route path="homework" element={<HomeworkList />} />
        <Route path="tests" element={<TestsList />} />
        <Route path="tests/new" element={<CreateTest />} />
        <Route path="attendance" element={<AttendanceView />} />
        <Route path="submissions" element={<SubmissionsList />} />
        <Route path="submissions/:id" element={<EvaluationView />} />
        <Route path="analytics" element={<AnalyticsView />} />
        <Route path="intelligence" element={<ClassIntelligence />} />
        <Route path="interventions" element={<InterventionsView />} />
        <Route path="materials" element={<MaterialsView />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* Admin Portal Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="subjects" element={<AdminSubjects />} />
        <Route path="academic-year" element={<AdminAcademicYear />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/student/home" replace />} />
    </Routes>
  );
};
