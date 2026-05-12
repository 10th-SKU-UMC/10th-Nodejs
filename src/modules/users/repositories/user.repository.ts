import { prisma } from "../../../db.config.js";

// ✅ 맨 위에 추가
export const addUser = async (data: {
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress?: string;
  phoneNumber: string;
}) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (existingUser) return null;

  const user = await prisma.user.create({ data });
  return user.id;
};

export const getUser = async (userId: number) => {  //getUser : 특정 사용자 정보 조회
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });   //조건에 맞는 유저가 없으면 에러 발생
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number) => {    //사용자와 음식 카테고리 간의 선호관계 매핑
  await prisma.userFavorCategory.create({   //foodCategoryId인자와 uesrId 인자에 각각 id값 전달
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환 (JOIN)
export const getUserPreferencesByUserId = async (userId: number) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId: userId },
    include: {
      foodCategory: true, // 💡 핵심: JOIN 대신 include를 써서 연관 데이터를 가져옵니다!
    },
    orderBy: { foodCategoryId: "asc" },
  });
};