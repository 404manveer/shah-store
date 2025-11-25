
const Address = require('../../models/addrress.model')
const User = require ('../../models/user.models')

const createAddress = async(req,res){
    try {
        const {  userId,address,pincode,city,notes }= req.body;

        if(!userId || !address || !pincode || !city ){
            return{
                success:false,
                message:"Insufficent data provide"
            }
        };

        const user = await User.findById(userId);

        if(!user){
            return{
                success:false,
                message:'user not found!'
            }
        };

        const newAddress = await Address.create({
            address,userId,pincode,city,notes
        })
        Address = newAddress
        await Address.save();

        return{
            success:true,
            message:'Address create successfully!',
            address:Address
        }
        
    } catch (error) {
        return{
            success:false,
            message:error.message || 'Address creating failed!'
        }
        
    }
}