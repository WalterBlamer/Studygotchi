import { z } from 'zod';

export const CreateStudyRoomSchema = z.object({
  roomName: z.string().min(1).max(30),
});

export const JoinStudyRoomSchema = z.object({
  joinCode: z.string().length(5), //code is exact length 5
});

export type StudyRoomBody = z.infer<typeof CreateStudyRoomSchema>;
