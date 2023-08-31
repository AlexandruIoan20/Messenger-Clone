import getCurrentUser from "@app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@app/libs/prismadb'; 

export const POST = async (request: Request) => { 
    try { 
        const currentUser = await getCurrentUser(); 
        const { name, image } = await request.json(); 

        if(!currentUser?.id) { 
            return new NextResponse('Unauthorized', { status: 401 }); 
        }; 

        const updatedUser = await prisma.user.update({ 
            where: { 
                id: currentUser.id
            }, 
            data: { 
                image: image, 
                name: name 
            }
        }); 

        return NextResponse.json(updatedUser); 
    } catch(err) { 
        console.log(err); 
        return new NextResponse('Internal Server Error', { status: 500 }); 
    }
}