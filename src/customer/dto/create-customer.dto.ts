import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(100, {
    message: 'O nome deve ter no máximo 100 characters.',
  })
  firstName: string;

  @IsNotEmpty({ message: 'O sobrenome não pode ser vazio.' })
  @MaxLength(150, {
    message: 'O sobrenome deve ter no máximo 150 characters.',
  })
  lastName: string;

  @IsEmail({}, { message: 'Email inválido.' })
  @IsNotEmpty({ message: 'Email não pode ser vazio.' })
  @Length(5, 254, { message: 'Email deve ter entre 5 e 254 caracteres.' })
  email: string;

  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 dígitos.' })
  phone: string;
}
