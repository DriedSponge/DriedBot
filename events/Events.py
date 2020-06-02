import discord
import random
from discord.ext import commands


class Events(commands.Cog):
    def __init__(self, client):
        self.client = client

    # events
    @commands.Cog.listener()
    async def on_member_join(self, member):
        welcomech = member.guild.system_channel
        embed = discord.Embed(title='Welcome!',
                              description=f'{member.mention} joined the server! We now have {member.guild.member_count} members!',
                              color=0x00FF44)
        await welcomech.send(embed=embed)

    @commands.Cog.listener()
    async def on_member_remove(self, member):
        welcomech = member.guild.system_channel
        embed = discord.Embed(title='Goodbye...',
                              description=f'{member.name} left the server. We now have {member.guild.member_count} members.',
                              color=0xFF0000)
        await welcomech.send(embed=embed)


def setup(client):
    client.add_cog(Events(client))
