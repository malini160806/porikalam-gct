import type { GalleryImage } from './types';

const palette = ['#0e2436', '#12314a', '#1a3f5c', '#274d6b', '#001b2a', '#2a3a4d'];

export const galleryImages: GalleryImage[] = [
  { id: 'g1', title: 'Opening Ceremony', category: 'Ceremony', span: 'wide', color: palette[0] },
  { id: 'g2', title: 'Robo Arena Finals', category: 'Technical', span: 'tall', color: palette[1] },
  { id: 'g3', title: 'Heritage Walk', category: 'Culturals', span: 'normal', color: palette[2] },
  { id: 'g4', title: 'Design Masters', category: 'Technical', span: 'normal', color: palette[3] },
  { id: 'g5', title: 'Night of Lights', category: 'Culturals', span: 'wide', color: palette[4] },
  { id: 'g6', title: 'Code Saga Sprint', category: 'Technical', span: 'normal', color: palette[5] },
  { id: 'g7', title: 'Project Expo Floor', category: 'Exhibition', span: 'tall', color: palette[0] },
  { id: 'g8', title: 'Crowd & Cheer', category: 'Culturals', span: 'normal', color: palette[1] },
  { id: 'g9', title: 'Workshop Session', category: 'Workshop', span: 'normal', color: palette[2] },
  { id: 'g10', title: 'Award Moments', category: 'Ceremony', span: 'wide', color: palette[3] },
  { id: 'g11', title: 'Civil Challenge Build', category: 'Technical', span: 'normal', color: palette[4] },
  { id: 'g12', title: 'Closing Fireworks', category: 'Ceremony', span: 'tall', color: palette[5] },
];
