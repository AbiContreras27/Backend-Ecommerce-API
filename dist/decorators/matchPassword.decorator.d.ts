import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class MatchPassword implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments): boolean;
    defaultMessage(args?: ValidationArguments): string;
}
