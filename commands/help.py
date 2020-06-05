import discord
import index
from discord.ext import commands


class Help(commands.Cog):
    """Help Formatter"""

    def __init__(self, client):
        self.client = client

    # commands
    @commands.command()
    @commands.check(index.InBotsChannel)
    @commands.guild_only()
    async def help(self, ctx, *cog):
        if not cog:
            embed = discord.Embed(description='Commands')
            cog_desc = ''
            for x in self.client.cogs:
                cog_desc += f'**{x}** - {self.client.cogs[x].__doc__}\n'
            embed.add_field(name='Cogs', value=cog_desc)
            await ctx.send(embed=embed)
        else:
            if len(cog) > 1:
                embed = discord.Embed(title='Error', description='Too may cogs!')
                await ctx.send('', embed=embed)
            else:
                found = False
                for x in self.client.cogs:
                    for y in cog:
                        if x == y:
                            embed = discord.Embed()
                            scog_info = ''
                            for c in self.client.get_cog(y).get_commands():
                                if not c.hidden:
                                    scog_info += f'**{c.name}** - {c.help}\n'
                            embed.add_field(name=f'{cog[0]} Module', value=scog_info)
                            found = True
                if not found:
                    for p in self.client.cogs:
                        print(p)
                        for c in self.client.get_cog(p).commands():
                            if c.name == cog[0]:
                                embed = discord.Embed()
                                embed.add_field(name=f'{c.name} - {c.help}', value=f'Proper Syntax:')
                        found = True
                        if not found:
                            embed = discord.Embed(description='Broken')
                else:
                    print('idk why i ahve this')
            await ctx.send(embed=embed)


def setup(client):
    client.add_cog(Help(client))
