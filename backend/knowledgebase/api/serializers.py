from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.contrib.auth.models import User
from knowledgebase.models import KnowledgeBase

class KnowledgeBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeBase
        fields = (
            'id',
            'name',
            'type',
            'size',
            'file',
            'created_at',
            'last_activity',
        )

# class CreatorSerializer(serializers.ModelSerializer):
#     avatar = serializers.URLField(source='profile.avatar')
#     status = serializers.URLField(source='profile.status')
#     name = serializers.CharField(source='profile.name')
#     class Meta:
#         model = User
#         fields = [
#             'username',
#             'name',
#             'avatar',
#             'status',
#             'is_staff'
#         ]

# class ThreadPostSerializer(serializers.ModelSerializer):
#     creator = CreatorSerializer(read_only=True)
#     created_at = serializers.SerializerMethodField()
#     class Meta:
#         model = Post
#         fields = [
#             'id',
#             'content',
#             'created_at',
#             'creator'
#         ]
#     def get_created_at(self, obj):
#         return naturaltime(obj.created_at)

# class ThreadDetailSerializer(serializers.ModelSerializer):
#     forum = serializers.HyperlinkedRelatedField(
#         read_only=True,
#         view_name='forum-detail',
#         lookup_field='slug'
#     )
#     creator = CreatorSerializer(read_only=True)
#     posts = ThreadPostSerializer(many=True, read_only=True)
#     created_at = serializers.SerializerMethodField()
#     class Meta:
#         model = Thread
#         fields = (
#             'id',
#             'name',
#             'forum',
#             'pinned',
#             'content',
#             'creator',
#             'created_at',
#             'last_activity',
#             'posts'
#         )
#         read_only_fields = ('id',)

#     def get_created_at(self, obj):
#         return naturaltime(obj.created_at)
