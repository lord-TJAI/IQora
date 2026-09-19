import React from 'react';
import {
  SubjectId,
  ActivityType,
  MathActivityType,
  PhysicsActivityType,
  ChemistryActivityType,
  EnglishActivityType,
  Concept,
} from '@/types/curriculum';
import { MathActivityRenderer } from './MathActivityRenderer';
import { PhysicsActivityRenderer } from './PhysicsActivityRenderer';
import { ChemistryActivityRenderer } from './ChemistryActivityRenderer';
import { EnglishActivityRenderer } from './EnglishActivityRenderer';

export interface ActivityRendererProps {
  subjectId: SubjectId;
  activityType: ActivityType;
  concept?: Concept;
  topic?: string;
  className?: string;
}

export const ActivityRenderer: React.FC<ActivityRendererProps> = ({
  subjectId,
  activityType,
  concept,
  topic,
  className,
}) => {
  switch (subjectId) {
    case 'mathematics':
      return (
        <MathActivityRenderer
          activityType={activityType as MathActivityType}
          concept={concept}
          topic={topic}
          className={className}
        />
      );

    case 'physics':
      return (
        <PhysicsActivityRenderer
          activityType={activityType as PhysicsActivityType}
          concept={concept}
          topic={topic}
          className={className}
        />
      );

    case 'chemistry':
      return (
        <ChemistryActivityRenderer
          activityType={activityType as ChemistryActivityType}
          concept={concept}
          topic={topic}
          className={className}
        />
      );

    case 'english':
      return (
        <EnglishActivityRenderer
          activityType={activityType as EnglishActivityType}
          concept={concept}
          topic={topic}
          className={className}
        />
      );

    default:
      return (
        <PhysicsActivityRenderer
          activityType="electricFieldSimulation"
          concept={concept}
          topic={topic}
          className={className}
        />
      );
  }
};
