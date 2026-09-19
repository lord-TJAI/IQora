export type QueryStatus = 'sent' | 'seen' | 'answered';

export interface QueryAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  url: string;
  sizeBytes?: number;
}

export interface StudentQuery {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  className: string;
  subjectId: 'mathematics' | 'physics' | 'chemistry' | 'english';
  subjectName: string;
  chapterId: string;
  chapterTitle: string;
  topicId?: string;
  conceptId?: string;
  conceptName?: string;
  contextSource: 'lesson' | 'practice' | 'assignment' | 'ai';
  message: string;
  attachments?: QueryAttachment[];
  createdAt: string;
  status: QueryStatus;
  teacherReply?: {
    teacherName: string;
    teacherAvatar: string;
    replyText: string;
    repliedAt: string;
    attachments?: QueryAttachment[];
    voiceNoteUrl?: string;
  };
}
