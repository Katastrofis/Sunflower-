import { NextRequest, NextResponse } from 'next/server';
import {
  addCommentToDecisionLog,
  toggleLikeDecisionLog,
} from '@/lib/services/decision-logs';
import { validateDecisionLogAction } from '@/lib/schemas';
import { sendError, sendSuccess, sendCreated, validateRequestBody } from '@/lib/api-utils';

// POST add comment to decision log or toggle like
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const body = await request.json();

    // Validate action
    const validation = validateRequestBody(body, validateDecisionLogAction);
    if (!validation.valid) {
      return sendError('Validation failed', 400, validation.errors);
    }

    const { action, ...data } = validation.data;

    if (action === 'comment') {
      const comment = await addCommentToDecisionLog(id, data);
      return sendCreated(comment);
    }

    if (action === 'like') {
      const result = await toggleLikeDecisionLog(id, data.userId);
      return sendSuccess(result);
    }

    return sendError('Invalid action', 400);
  } catch (error) {
    console.error('Error processing decision log action:', error);
    return sendError('Failed to process action', 500);
  }
}
