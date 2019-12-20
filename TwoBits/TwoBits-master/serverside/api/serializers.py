from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'first_name', 'last_name', 'date_joined',)
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User
        # Tuple of serialized model fields (see link [2])
        fields = ['username', 'password','email','profile',]
        extra_kwargs = {"password": {"write_only":True}}
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data.pop('password'))
        user.save()
        Profile.objects.create(user=user, **profile_data)
        return user