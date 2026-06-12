import { NextRequest, NextResponse } from 'next/server';
import {
  createDecisionLog,
  getDecisionLogs,
  getDecisionLogById,
  updateDecisionLog,
  deleteDecisionLog,
} from '@/lib/services/decision-logs';
import {
  validateDecisionLogCreate,
  validateDecisionLogUpdate,
} from '@/lib/schemas';
import { sendError, sendSuccess, sendCreated, validateRequestBody } from '@/lib/api-utils';

// GET all decision logs or filter by team
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');
    const id = searchParams.get('id');

    if (id) {
      const log = await getDecisionLogById(id);
      return sendSuccess(log);
    }

    const logs = await getDecisionLogs(teamId || undefined);
    return sendSuccess(logs);
  } catch (error) {
    console.error('Error fetching decision logs:', error);
    return sendError('Failed to fetch decision logs', 500);
  }
}

// POST create new decision log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = validateRequestBody(body, validateDecisionLogCreate);
    if (!validation.valid) {
      return sendError('Validation failed', 400, validation.errors);
    }

    const log = await createDecisionLog(validation.data);
    return sendCreated(log);
  } catch (error) {
    console.error('Error creating decision log:', error);
    return sendError('Failed to create decision log', 500);
  }
}

// PUT update decision log
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return sendError('ID is required', 400);
    }

    const body = await request.json();
    
    // Validate input (partial)
    const validation = validateRequestBody(body, validateDecisionLogUpdate);
    if (!validation.valid) {
      return sendError('Validation failed', 400, validation.errors);
    }

    const log = await updateDecisionLog(id, validation.data);
    return sendSuccess(log);
  } catch (error) {
    console.error('Error updating decision log:', error);
    return sendError('Failed to update decision log', 500);
  }
}

// DELETE decision log
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return sendError('ID is required', 400);
    }

    await deleteDecisionLog(id);
    return sendSuccess({ success: true });
  } catch (error) {
    console.error('Error deleting decision log:', error);
    return sendError('Failed to delete decision log', 500);
  }
}
