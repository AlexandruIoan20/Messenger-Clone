import getCurrentUser from "@app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@app/libs/prismadb'; 

interface IParams { 
    conversationId?: string 
}

export const DELETE = async(request: Request, { params } : { params : IParams }) => { 
    try { 
        const { conversationId } = params; 
        const currentUser = await getCurrentUser(); 

        if(!currentUser?.id) { 
            return new NextResponse('Unauthorized', { status: 401 }); 
        }

        const existingConversation = await prisma?.conversation.findUnique({ 
            where: { 
                id: conversationId
            }, 
            include: { 
                users: true // for pusher in the future if it doesn t make sense
            }
        }); 

        if(!existingConversation) { 
            return new NextResponse('Invalid ID', { status: 400 }); 
        }

        const deletedConversation = await prisma.conversation.deleteMany({ 
            where: { 
                id: conversationId, 
                userIds: { 
                    hasSome: [ currentUser.id ]
                }
            }
        }); 

        return NextResponse.json(deletedConversation); 
    } catch(err: any) {  
        console.log(err); 
        return new NextResponse('Internal Server Error', { status: 500 }); 
    }
}