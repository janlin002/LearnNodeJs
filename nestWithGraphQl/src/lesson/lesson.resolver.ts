import { Resolver } from '@nestjs/graphql';

import { LessonType } from './lesson.type';
import { Query } from '@nestjs/common';

// @Resolver((of) => LessonType)
@Resolver(() => LessonType)
export class LessonResolver {
  @Query(() => LessonType)
  lesson(): LessonType {
    return {
      id: 'asdfasdf',
      name: 'Physics Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
