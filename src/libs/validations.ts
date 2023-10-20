import validator from "validator";
import UserType from "../@types/UserType";

class Validations {
  fullName(name: string): string | null {
    if (!name) {
      return "Please enter a name.";
    }

    if (name.length < 3) {
      return "Your name is too short.";
    }

    return null;
  }

  nick(nick: string): string | null {
    if (!nick) {
      return "Please enter a nick.";
    }

    const sanitizedNick = nick.replace(/[^A-Za-z0-9_-]/g, "");

    if (sanitizedNick.trim().length > 30) {
      return "You can use a maximum of 30 characters in your nick.";
    }

    if (sanitizedNick.trim().length < 3) {
      return "Your nick must have at least 3 characters.";
    }

    return null;
  }

  email(email: string): string | null {
    if (!email) {
      return "Please enter an email.";
    }

    if (!validator.isEmail(email)) {
      return "Enter a valid email.";
    }

    return null;
  }

  pass(pass: string): string | null {
    if (!pass) {
      return "Please enter a password.";
    }

    if (
      !validator.isStrongPassword(pass, {
        minLength: 8,
        minLowercase: 0,
        minNumbers: 2,
        minUppercase: 0,
        minSymbols: 0,
      })
    ) {
      return "Password too weak, please try another one with at least 8 characters and containing at 2 numbers.";
    }

    return null;
  }

  user(data: UserType) {
    const errors: (string | null)[] = [
      this.fullName(data.name),
      this.nick(data.nick),
      this.pass(data.pass),
    ];

    return errors.filter((error) => error !== null) as string[];
  }
}

export default new Validations();
