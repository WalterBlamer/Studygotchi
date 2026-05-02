import { AppDataSource } from '../dataSource.js';
import { StudyRoom } from '../entities/StudyRoom.js';
import { User } from '../entities/User.js';

const StudyRoomRepository = AppDataSource.getRepository(StudyRoom);

async function createStudyRoomModel(roomName: string, user: User): Promise<StudyRoom> {
  const newStudyRoom = new StudyRoom();
  newStudyRoom.roomName = roomName;
  newStudyRoom.members = [user];

  return await StudyRoomRepository.save(newStudyRoom);
}

//how to properly get all study rooms in a ManyToMany relation
async function getAllStudyRoomsModel(userId: string): Promise<StudyRoom[]> {
  //only return rooms the user is part of
  return await StudyRoomRepository.find({
    where: { members: { userId } },
    relations: ['members'],
  });
}

async function getStudyRoomByIdModel(roomId: string): Promise<StudyRoom | null> {
  return await StudyRoomRepository.findOne({
    where: { roomId },
    relations: ['members'],
  });
}

async function joinStudyRoomModel(joinCode: string, user: User): Promise<StudyRoom | null> {
  const studyRoom = await StudyRoomRepository.findOne({
    where: { joinCode },
    relations: ['members'],
  });

  //if studyroom not found
  if (!studyRoom) return null;

  //avoid double join
  const inStudyRoom = studyRoom.members.find((member) => member.userId === user.userId);

  if (!inStudyRoom) {
    studyRoom.members.push(user);
    await StudyRoomRepository.save(studyRoom);
  }

  return await StudyRoomRepository.findOne({
    where: { roomId: studyRoom.roomId },
    relations: ['members'],
  });
}

export { createStudyRoomModel, getAllStudyRoomsModel, getStudyRoomByIdModel, joinStudyRoomModel };
