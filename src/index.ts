import express, { Express } from 'express';
import { requireAuth } from './authMiddleware.js';
import './config.js'; // do not remove this line
import { createActivity, getActivities, updateActivity } from './controllers/ActivityController.js';
import { createEvent, getEvents, updateEvent } from './controllers/EventController.js';
import { createNote, getNotes, updateNote } from './controllers/NoteController.js';
import { createPet, getPet } from './controllers/PetController.js';
import { createPurchase, getPurchases } from './controllers/PurchaseController.js';
import { getAllShopItems, getShopItem } from './controllers/ShopItemController.js';
import {
  createStudyRoom,
  getAllStudyRooms,
  getStudyRoomById,
  joinStudyRoom,
} from './controllers/StudyRoomController.js';
import { createTask, getTasks, updateTask } from './controllers/TaskController.js';
import { createUser, getUserProfile, logIn, logOut } from './controllers/UserController.js';
import { sessionMiddleware } from './sessionConfig.js';

const app: Express = express();

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------
// Register your routes below this line
// public routes
app.post('/users', createUser);
app.post('/login', logIn);
app.delete('/sessions', logOut);

// protected routes
app.use('/users', requireAuth); // all /users routes after this need auth
app.get('/users/profile', getUserProfile);

app.use('/pets', requireAuth);
app.post('/pets', createPet);
app.get('/pets/:petId', getPet);

app.use('/notes', requireAuth);
app.get('/notes', getNotes);
app.post('/notes', createNote);
app.patch('/notes/:noteId', updateNote);

app.use('/shopItems', requireAuth);
app.get('/shopItems', getAllShopItems);
app.get('/shopItems/:itemId', getShopItem);

app.use('/purchases', requireAuth);
app.get('/purchases', getPurchases);
app.post('/purchases', createPurchase);

app.use('/rooms', requireAuth);
app.post('/rooms', createStudyRoom);
app.get('/rooms', getAllStudyRooms);
app.get('/rooms/:studyRoomId', getStudyRoomById);
app.post('/rooms/join', joinStudyRoom);

app.use('/activities', requireAuth);
app.post('/activities', createActivity);
app.get('/activities', getActivities);
app.patch('/activities/:activityId', updateActivity);

app.use('/tasks', requireAuth);
app.post('/tasks', createTask);
app.get('/tasks', getTasks);
app.patch('/tasks/:taskId', updateTask);

app.use('/events', requireAuth);
app.post('/events', createEvent);
app.get('/events', getEvents);
app.patch('/events/:eventId', updateEvent);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
