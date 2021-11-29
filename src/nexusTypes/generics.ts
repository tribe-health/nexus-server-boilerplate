import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'
import { GraphQLUpload } from 'graphql-upload'
import { asNexusMethod, enumType, inputObjectType } from 'nexus'

const jsonScalar = new GraphQLScalarType({
  ...JSONObjectResolver,
  // Override the default 'JsonObject' name with one that matches what Nexus Prisma expects.
  name: 'Json',
})

const dateTimeScalar = new GraphQLScalarType(DateTimeResolver)

export const DateTime = asNexusMethod(dateTimeScalar, 'dateTime')
export const Json = asNexusMethod(jsonScalar, 'json')
export const Upload = asNexusMethod(GraphQLUpload, 'upload')

export const BoolFieldUpdateOperationsInput = inputObjectType({
  name: 'BoolFieldUpdateOperationsInput',
  definition(t) {
    t.boolean('set')
  },
})
export const BoolFilter = inputObjectType({
  name: 'BoolFilter',
  definition(t) {
    t.boolean('equals')
    t.field('not', { type: NestedBoolFilter })
  },
})
export const DateTimeFieldUpdateOperationsInput = inputObjectType({
  name: 'DateTimeFieldUpdateOperationsInput',
  definition(t) {
    t.field('set', { type: DateTime })
  },
})
export const DateTimeFilter = inputObjectType({
  name: 'DateTimeFilter',
  definition(t) {
    t.field('equals', { type: DateTime })
    t.field('gt', { type: DateTime })
    t.field('gte', { type: DateTime })
    t.list.nonNull.field('in', { type: DateTime })
    t.field('lt', { type: DateTime })
    t.field('lte', { type: DateTime })
    t.field('not', { type: NestedDateTimeFilter })
    t.list.nonNull.field('notIn', { type: DateTime })
  },
})
export const IntFilter = inputObjectType({
  name: 'IntFilter',
  definition(t) {
    t.int('equals')
    t.int('gt')
    t.int('gte')
    t.list.nonNull.int('in')
    t.int('lt')
    t.int('lte')
    t.field('not', { type: NestedIntFilter })
    t.list.nonNull.int('notIn')
  },
})
export const IntNullableFilter = inputObjectType({
  name: 'IntNullableFilter',
  definition(t) {
    t.int('equals')
    t.int('gt')
    t.int('gte')
    t.list.nonNull.int('in')
    t.int('lt')
    t.int('lte')
    t.field('not', { type: NestedIntNullableFilter })
    t.list.nonNull.int('notIn')
  },
})
export const NestedBoolFilter = inputObjectType({
  name: 'NestedBoolFilter',
  definition(t) {
    t.boolean('equals')
    t.field('not', { type: NestedBoolFilter })
  },
})
export const NestedDateTimeFilter = inputObjectType({
  name: 'NestedDateTimeFilter',
  definition(t) {
    t.field('equals', { type: DateTime })
    t.field('gt', { type: DateTime })
    t.field('gte', { type: DateTime })
    t.list.nonNull.field('in', { type: DateTime })
    t.field('lt', { type: DateTime })
    t.field('lte', { type: DateTime })
    t.field('not', { type: NestedDateTimeFilter })
    t.list.nonNull.field('notIn', { type: DateTime })
  },
})
export const NestedIntFilter = inputObjectType({
  name: 'NestedIntFilter',
  definition(t) {
    t.int('equals')
    t.int('gt')
    t.int('gte')
    t.list.nonNull.int('in')
    t.int('lt')
    t.int('lte')
    t.field('not', { type: NestedIntFilter })
    t.list.nonNull.int('notIn')
  },
})
export const NestedIntNullableFilter = inputObjectType({
  name: 'NestedIntNullableFilter',
  definition(t) {
    t.int('equals')
    t.int('gt')
    t.int('gte')
    t.list.nonNull.int('in')
    t.int('lt')
    t.int('lte')
    t.field('not', { type: NestedIntNullableFilter })
    t.list.nonNull.int('notIn')
  },
})
export const NestedStringFilter = inputObjectType({
  name: 'NestedStringFilter',
  definition(t) {
    t.string('contains')
    t.string('endsWith')
    t.string('equals')
    t.string('gt')
    t.string('gte')
    t.list.nonNull.string('in')
    t.string('lt')
    t.string('lte')
    t.field('not', { type: NestedStringFilter })
    t.list.nonNull.string('notIn')
    t.string('startsWith')
  },
})
export const NestedStringNullableFilter = inputObjectType({
  name: 'NestedStringNullableFilter',
  definition(t) {
    t.string('contains')
    t.string('endsWith')
    t.string('equals')
    t.string('gt')
    t.string('gte')
    t.list.nonNull.string('in')
    t.string('lt')
    t.string('lte')
    t.field('not', { type: NestedStringNullableFilter })
    t.list.nonNull.string('notIn')
    t.string('startsWith')
  },
})
export const NullableStringFieldUpdateOperationsInput = inputObjectType({
  name: 'NullableStringFieldUpdateOperationsInput',
  definition(t) {
    t.string('set')
  },
})
export const StringFieldUpdateOperationsInput = inputObjectType({
  name: 'StringFieldUpdateOperationsInput',
  definition(t) {
    t.string('set')
  },
})
export const StringFilter = inputObjectType({
  name: 'StringFilter',
  definition(t) {
    t.string('contains')
    t.string('endsWith')
    t.string('equals')
    t.string('gt')
    t.string('gte')
    t.list.nonNull.string('in')
    t.string('lt')
    t.string('lte')
    t.field('mode', { type: QueryMode })
    t.field('not', { type: NestedStringFilter })
    t.list.nonNull.string('notIn')
    t.string('startsWith')
  },
})
export const StringNullableFilter = inputObjectType({
  name: 'StringNullableFilter',
  definition(t) {
    t.string('contains')
    t.string('endsWith')
    t.string('equals')
    t.string('gt')
    t.string('gte')
    t.list.nonNull.string('in')
    t.string('lt')
    t.string('lte')
    t.field('mode', { type: QueryMode })
    t.field('not', { type: NestedStringNullableFilter })
    t.list.nonNull.string('notIn')
    t.string('startsWith')
  },
})

export const JsonFilter = inputObjectType({
  name: 'JsonFilter',
  definition(t) {
    t.list.string('array_contains')
    t.list.string('array_starts_with')
    t.list.string('array_ends_with')
    t.list.nonNull.string('path')
    t.string('equals')
    t.string('string_contains')
    t.string('string_starts_with')
    t.string('string_ends_with')
  },
})

export const QueryMode = enumType({
  name: 'QueryMode',
  members: ['default', 'insensitive'],
})
export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})
