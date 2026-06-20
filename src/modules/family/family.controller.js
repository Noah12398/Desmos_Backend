import { createFamilySchema,familyIdSchema,removeMemberSchema } from './family.schema.js';
import { ok } from '../../utils/helpers.js';
import * as familyService from './family.service.js';

export async function createFamily(req, res, next) {
  try {
    const validated = createFamilySchema.parse({
      ...req.body,
      owner_id: req.user.id, // injected from JWT via authMiddleware
    });
    const family = await familyService.createFamily(validated);
    return ok(res, family);
  } catch (error) {
    next(error);
  }
}

export async function getFamilyMembers(req, res, next) {
  try {
    const { id } = req.params;
    const validated=familyIdSchema.parse({id});
    const members = await familyService.getFamilyMembers(validated);
    return ok(res, members);
  } catch (error) {
    next(error);
  }
}

export async function removeFamilyMember(req, res, next) {
  try{
    const{id,userId}=req.params;
    const validated=removeMemberSchema.parse({id,userId});
    const member=await familyService.removeFamilyMember(validated);
    return ok(res,member);
  }catch(error){
    next(error);
  }
}

export async function getFamilies(req, res, next) {
  try {
    const userId=req.user.id;
    const families = await familyService.getFamilies(userId);
    return ok(res, families);
  } catch (error) {
    next(error);
  }
}