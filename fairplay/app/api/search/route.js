import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(request) {
  try {
    const encodedParams = request.nextUrl.searchParams.get('paramName');
    const params = encodedParams ? decodeURIComponent(encodedParams) : null;

    if (params) {
      let searchTerms = params.split(/\s+/).filter(Boolean);
      searchTerms.sort(); 

      const data = await db.kaksipyoraiset_data.findMany({
        where: {
          AND: searchTerms.map((term) => ({
            OR: [
              { merkkiSelvakielinen: { contains: term, mode: 'insensitive' } },
              { kaupallinenNimi: { contains: term, mode: 'insensitive' } }
            ],
          })),
        },
        take: 50,
        orderBy: {
          merkkiSelvakielinen: 'asc'
        }
      });

      return NextResponse.json({ data }, { status: 200 });
    } else {
      const page = parseInt(request.nextUrl.searchParams.get('page')) || 1;
      const pageSize = 30;
      const skip = (page - 1) * pageSize;

      const initialData = await db.kaksipyoraiset_data.findMany({
        take: pageSize,
        skip,
        orderBy: {
          merkkiSelvakielinen: 'asc'
        }
      });

      return NextResponse.json({ data: initialData }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    await db.$disconnect();
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
