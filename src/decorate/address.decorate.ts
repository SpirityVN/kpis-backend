import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ethers } from 'ethers';

export function IsAddress(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAddress',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && ethers.utils.isAddress(value);
        },
      },
    });
  };
}