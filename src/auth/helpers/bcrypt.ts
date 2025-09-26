import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;



export const genRatePassword = async (password: string) => {
    if (!password || password.length < 6) {
        throw new Error("Passsword Cannot be empty")
    }
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
};
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    if (!plainPassword || !hashedPassword) {
      throw new Error("Passwords cannot be empty");
    }
  
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  };

